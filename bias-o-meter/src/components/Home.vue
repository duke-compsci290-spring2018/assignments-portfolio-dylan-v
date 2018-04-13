<template>
  <v-container>
    <div>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn color="primary" dark slot="activator" class="mb-3" v-show="user !== null">New Item</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field label="Newspaper" v-model="editedItem.name"></v-text-field>
                  <v-text-field label="URL" v-model="editedItem.url"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-data-table
        :headers="headers"
        :items="items"
        :user="user"
        class="elevation-1"
        hide-actions
      >
        <template slot="items" slot-scope="props">
          <td><a :href="props.item.url" target="_blank">{{ props.item.name }}</a></td>
          <td>
            <v-flex>
              <v-btn flat icon color="blue" @click="voteLib(props.item)" :disabled="user == null || user.lastVote[items.indexOf(props.item)] == 'lib'">
                <v-icon>web</v-icon>
              </v-btn>
              <v-btn flat icon color="light-blue" @click="voteModLib(props.item)" :disabled="user == null || user.lastVote[items.indexOf(props.item)] == 'modLib'">
                <v-icon>web</v-icon>
              </v-btn>
              <v-btn flat icon color="purple" @click="voteCentrist(props.item)" :disabled="user == null || user.lastVote[items.indexOf(props.item)] == 'Centrist'">
                <v-icon>web</v-icon>
              </v-btn>
              <v-btn flat icon color="orange" @click="voteModRep(props.item)" :disabled="user == null || user.lastVote[items.indexOf(props.item)] == 'modRep'">
                <v-icon>web</v-icon>
              </v-btn>
              <v-btn flat icon color="red" @click="voteRep(props.item)" :disabled="user == null || user.lastVote[items.indexOf(props.item)] == 'rep'">
                <v-icon>web</v-icon>
              </v-btn>
              <td class="text-xs-left">Bias towards {{props.item.biasTowards}} with {{ props.item.topVote }} votes</td>
            </v-flex>
          </td>

          <td class="text-xs-left">
            <v-btn flat icon color="green" @click="thumbUp(props.item)" :disabled="user == null || user.lastThumb[items.indexOf(props.item)] == 'up'">
              <v-icon>thumb_up</v-icon>
            </v-btn>
            <v-btn flat icon color="deep-orange" @click="thumbDown(props.item)" :disabled="user == null || user.lastThumb[items.indexOf(props.item)] == 'down'">
              <v-icon>thumb_down</v-icon>
            </v-btn>
          </td>


          <td class="text-xs-left">{{props.item.thumbsUp}} / {{props.item.thumbsDown}}</td>

          <td class="justify-center layout px-0">
            <v-btn icon class="mx-0" @click="editItem(props.item)" :disabled="user == null || !userIsCreator(props.item)">
              <v-icon color="teal">edit</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click="deleteItem(props.item)" :disabled="user == null || user !== null">
              <v-icon color="pink">delete</v-icon>
            </v-btn>
          </td>

        </template>
        <template slot="no-data">
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Newspaper',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Bias', sortable:false },
        { text: 'What do you think?', sortable:false },
        { text: 'Feedback', sortable:false },
        { text: 'Actions', sortable: false }
      ],
      editedIndex: -1,
      editedItem:{
        name: '',
        url: '',
        votesLib:0,
        votesModLib:0,
        votesCentrist:0,
        votesModRep:0,
        votesRep:0,
        topVote:0,
        biasTowards: '',
        thumbsUp:0,
        thumbsDown:0,
        index: 0,
      },
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      //Loads in items from store
      user () {
        return this.$store.getters.user
      },
      items () {
        if (this.user == null){ //This will be important for "guest" mode
          return this.$store.getters.loadedNewspapers
        }
        var thumbArr = Array(this.$store.getters.loadedNewspapers.length).fill('')
        var voteArr = Array(this.$store.getters.loadedNewspapers.length).fill('')
        for (var i = 0; i < thumbArr.length; i++){
          if (this.user.lastThumb[i] !== ''){
            thumbArr[i] = this.user.lastThumb[i]
          }
          if( thumbArr[i] == undefined){
            thumbArr[i] = ''
          }
        }
        for (var i = 0; i < voteArr.length; i++){
          if (this.user.lastVote[i] !== ''){
            voteArr[i] = this.user.lastVote[i]
          }
          if( voteArr[i] == undefined){
            voteArr[i] = ''
          }
        }


        this.user.lastThumb = thumbArr;
        this.user.lastVote = voteArr;
        console.log("source added")
        return this.$store.getters.loadedNewspapers
      },

    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.items = []
      },

      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)

        this.dialog = true
      },

      deleteItem (item) {
        const index = this.items.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.items.splice(index, 1)
        //recalculate indicies
        //need to also recalculate vote/thumb arrays
        for (var i = 0; i < this.items.length; i++){
          this.items[i].index = i;
        }
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.items[this.editedIndex], this.editedItem)
          this.$store.dispatch('updateNewspaper', this.editedItem)
          console.log("Edited index: " + this.editedIndex)
          console.log("Actual index: " + this.editedItem.index)
        } else {
          //New list items
          //Need to also recalculate vote/thumb arrays
          var i;
          for (i = 0; i < this.items.length; i++){
            this.items[i].index = i;
          }
          var newIndex = i;
          const newNewspaper = {
            creatorID: this.$store.getters.user.id,
            name: '',
            url: '',
            votesLib:0,
            votesModLib:0,
            votesCentrist:0,
            votesModRep:0,
            votesRep:0,
            topVote:0,
            biasTowards: '',
            thumbsUp:0,
            thumbsDown:0,
            index: 0,
          };
          newNewspaper.index = newIndex;
          newNewspaper.name = this.editedItem.name;
          newNewspaper.url = this.editedItem.url;
          this.$store.dispatch('addNewspaper', newNewspaper)
        }
        this.close()
      },
      userIsCreator(item) {
        var itemIndex = this.items.indexOf(item)
        return this.$store.getters.user.id == this.items[itemIndex].creatorID;
      },

      thumbUp(item){
        var itemIndex = this.items.indexOf(item); //
        if (this.user.lastThumb[itemIndex] == ''){
          this.items[itemIndex].thumbsUp++;
          this.user.lastThumb[itemIndex] = 'up';
          console.log(this.user.lastThumb)
          const updatedNewspaper = this.items[itemIndex];
          //console.log("Payload name: " + updatedNewspaper.name)
          this.$store.dispatch('updateNewspaper', updatedNewspaper) //"Update thumb up"
          this.$store.dispatch('updateUserThumbs', this.user.lastThumb)
        }
        else if (this.user.lastThumb[itemIndex] == 'down'){
          this.items[itemIndex].thumbsUp++;
          this.items[itemIndex].thumbsDown--;
          this.user.lastThumb[itemIndex] = 'up';
          console.log(this.user.lastThumb)
          const updatedNewspaper = this.items[itemIndex];
          this.$store.dispatch('updateNewspaper', updatedNewspaper) //"Update thumb up"
          this.$store.dispatch('updateUserThumbs', this.user.lastThumb)
        }
        else{
          console.log("Spam prevention");
        }
      },
      thumbDown(item){
        var itemIndex = this.items.indexOf(item);
        if (this.user.lastThumb[itemIndex] == ''){
          this.items[itemIndex].thumbsDown++;
          this.user.lastThumb[itemIndex] = 'down';
          console.log(this.user.lastThumb)
          const updatedNewspaper = this.items[itemIndex];
          this.$store.dispatch('updateNewspaper', updatedNewspaper);
          this.$store.dispatch('updateUserThumbs', this.user.lastThumb)

        }
        else if (this.user.lastThumb[itemIndex] == 'up'){
          this.items[itemIndex].thumbsUp--;
          this.items[itemIndex].thumbsDown++;
          this.user.lastThumb[itemIndex] = 'down';
          console.log(this.user.lastThumb)
          const updatedNewspaper = this.items[itemIndex];
          this.$store.dispatch('updateNewspaper', updatedNewspaper);
          this.$store.dispatch('updateUserThumbs', this.user.lastThumb)

        }
        else{
          console.log("Spam prevention");
        }

      //WARNING: Spaghetti code below
      },
      voteLib(item){
        var itemIndex = this.items.indexOf(item);
        if (this.user.lastVote[itemIndex] == ''){
          this.items[itemIndex].votesLib++
          this.user.lastVote[itemIndex] = 'lib'
          const updatedNewspaper = this.items[itemIndex];
          this.$store.dispatch('updateNewspaper', updatedNewspaper)
          this.$store.dispatch('updateUserVotes', this.user.lastVote)

        }
        else if (this.user.lastVote[itemIndex]=='modLib'){
          this.items[itemIndex].votesLib++;
          this.items[itemIndex].votesModLib--;
          this.user.lastVote[itemIndex]='lib'
          if (this.items[itemIndex].biasTowards == 'Moderate Liberal'){
            this.items[itemIndex].topVote--;
          }
          const updatedNewspaper = this.items[itemIndex];
          this.$store.dispatch('updateNewspaper', updatedNewspaper);
          this.$store.dispatch('updateUserVotes', this.user.lastVote)

        }
        else if (this.user.lastVote[itemIndex]=='Centrist'){
          this.items[itemIndex].votesLib++;
          this.items[itemIndex].votesCentrist--;
          this.user.lastVote[itemIndex]='lib'
          if (this.items[itemIndex].biasTowards == 'Centrist'){
            this.items[itemIndex].topVote--;
          }
          const updatedNewspaper = this.items[itemIndex];
          this.$store.dispatch('updateNewspaper', updatedNewspaper);
          this.$store.dispatch('updateUserVotes', this.user.lastVote)

        }
        else if (this.user.lastVote[itemIndex]=='modRep'){
          this.items[itemIndex].votesLib++;
          this.items[itemIndex].votesModRep--;
          this.user.lastVote[itemIndex]='lib'
          if (this.items[itemIndex].biasTowards == 'Moderate Republican'){
            this.items[itemIndex].topVote--;
          }
          const updatedNewspaper = this.items[itemIndex];
          this.$store.dispatch('updateNewspaper', updatedNewspaper);
          this.$store.dispatch('updateUserVotes', this.user.lastVote)

        }
        else if (this.user.lastVote[itemIndex]=='rep'){
          this.items[itemIndex].votesLib++;
          this.items[itemIndex].votesRep--;
          this.user.lastVote[itemIndex]='lib'
          if (this.items[itemIndex].biasTowards == 'Republican'){
            this.items[itemIndex].topVote--;
          }
          const updatedNewspaper = this.items[itemIndex];
          this.$store.dispatch('updateNewspaper', updatedNewspaper);
          this.$store.dispatch('updateUserVotes', this.user.lastVote)

        }
        else{
          console.log("Spam prevention");
        }
        if (this.items[itemIndex].votesLib >= this.items[itemIndex].topVote){
          this.items[itemIndex].topVote = this.items[itemIndex].votesLib;
          this.items[itemIndex].biasTowards = 'Liberal';
          const updatedNewspaper = this.items[itemIndex];
          this.$store.dispatch('updateNewspaper', updatedNewspaper);

        }
        console.log(this.user.lastVote)
      },
      voteModLib(item){
        var itemIndex = this.items.indexOf(item);
        if (this.user.lastVote[itemIndex]==''){
          this.items[itemIndex].votesModLib++;
          this.user.lastVote[itemIndex]='modLib';
          const updatedNewspaper = this.items[itemIndex];

          this.$store.dispatch('updateNewspaper', updatedNewspaper);
          this.$store.dispatch('updateUserVotes', this.user.lastVote)

        }
        else if (this.user.lastVote[itemIndex]=='lib'){
          this.items[itemIndex].votesModLib++;
          this.items[itemIndex].votesLib--;
          this.user.lastVote[itemIndex]='modLib'
          if (this.items[itemIndex].biasTowards == 'Liberal'){
            this.items[itemIndex].topVote--;
          }
          const updatedNewspaper = this.items[itemIndex];
          this.$store.dispatch('updateNewspaper', updatedNewspaper);
          this.$store.dispatch('updateUserVotes', this.user.lastVote)

        }
        else if (this.user.lastVote[itemIndex]=='Centrist'){
          this.items[itemIndex].votesModLib++;
          this.items[itemIndex].votesCentrist--;
          this.user.lastVote[itemIndex]='modLib'
          if (this.items[itemIndex].biasTowards == 'Centrist'){
            this.items[itemIndex].topVote--;
          }
          const updatedNewspaper = this.items[itemIndex];
          this.$store.dispatch('updateNewspaper', updatedNewspaper);
          this.$store.dispatch('updateUserVotes', this.user.lastVote)

        }
        else if (this.user.lastVote[itemIndex]=='modRep'){
          this.items[itemIndex].votesModLib++;
          this.items[itemIndex].votesModRep--;
          this.user.lastVote[itemIndex]='modLib'
          if (this.items[itemIndex].biasTowards == 'Moderate Republican'){
            this.items[itemIndex].topVote--;
          }
          const updatedNewspaper = this.items[itemIndex];
          this.$store.dispatch('updateNewspaper', updatedNewspaper);
          this.$store.dispatch('updateUserVotes', this.user.lastVote)

        }
        else if (this.user.lastVote[itemIndex]=='rep'){
          this.items[itemIndex].votesModLib++;
          this.items[itemIndex].votesRep--;
          this.user.lastVote[itemIndex]='modLib'
          if (this.items[itemIndex].biasTowards == 'Republican'){
            this.items[itemIndex].topVote--;
          }
          const updatedNewspaper = this.items[itemIndex];
          this.$store.dispatch('updateNewspaper', updatedNewspaper);
          this.$store.dispatch('updateUserVotes', this.user.lastVote)

        }
        else{
          console.log("Spam prevention");
        }
        if (this.items[itemIndex].votesModLib >= this.items[itemIndex].topVote){
          this.items[itemIndex].topVote = this.items[itemIndex].votesModLib;
          this.items[itemIndex].biasTowards = 'Moderate Liberal';
          const updatedNewspaper = this.items[itemIndex];
          this.$store.dispatch('updateNewspaper', updatedNewspaper);

        }
        console.log(this.user.lastVote)

      },
      voteCentrist(item){
        var itemIndex = this.items.indexOf(item);
        if (this.user.lastVote[itemIndex]==''){
          this.items[itemIndex].votesCentrist++;
          this.user.lastVote[itemIndex]='Centrist';
          const updatedNewspaper = this.items[itemIndex];
          this.$store.dispatch('updateNewspaper', updatedNewspaper);
          this.$store.dispatch('updateUserVotes', this.user.lastVote)

        }
        else if (this.user.lastVote[itemIndex]=='lib'){
          this.items[itemIndex].votesCentrist++;
          this.items[itemIndex].votesLib--;
          this.user.lastVote[itemIndex]='Centrist';
          if (this.items[itemIndex].biasTowards == 'Liberal'){
            this.items[itemIndex].topVote--;
          }
          const updatedNewspaper = this.items[itemIndex];
          this.$store.dispatch('updateNewspaper', updatedNewspaper);
          this.$store.dispatch('updateUserVotes', this.user.lastVote)

        }
        else if (this.user.lastVote[itemIndex]=='modLib'){
          this.items[itemIndex].votesCentrist++;
          this.items[itemIndex].votesModLib--;
          this.user.lastVote[itemIndex]='Centrist';
          if (this.items[itemIndex].biasTowards == 'Moderate Liberal'){
            this.items[itemIndex].topVote--;
          }
          const updatedNewspaper = this.items[itemIndex];
          this.$store.dispatch('updateNewspaper', updatedNewspaper);
          this.$store.dispatch('updateUserVotes', this.user.lastVote)

        }
        else if (this.user.lastVote[itemIndex]=='modRep'){
          this.items[itemIndex].votesCentrist++;
          this.items[itemIndex].votesModRep--;
          this.user.lastVote[itemIndex]='Centrist';
          if (this.items[itemIndex].biasTowards == 'Moderate Republican'){
            this.items[itemIndex].topVote--;
          }
          const updatedNewspaper = this.items[itemIndex];
          this.$store.dispatch('updateNewspaper', updatedNewspaper);
          this.$store.dispatch('updateUserVotes', this.user.lastVote)

        }
        else if (this.user.lastVote[itemIndex]=='rep'){
          this.items[itemIndex].votesCentrist++;
          this.items[itemIndex].votesRep--;
          this.user.lastVote[itemIndex]='Centrist';
          if (this.items[itemIndex].biasTowards == 'Republican'){
            this.items[itemIndex].topVote--;
          }
          const updatedNewspaper = this.items[itemIndex];
          this.$store.dispatch('updateNewspaper', updatedNewspaper);
          this.$store.dispatch('updateUserVotes', this.user.lastVote)

        }
        else{
          console.log("Spam prevention");
        }
        if (this.items[itemIndex].votesCentrist >= this.items[itemIndex].topVote){
          this.items[itemIndex].topVote = this.items[itemIndex].votesCentrist;
          this.items[itemIndex].biasTowards = 'Centrist';
          const updatedNewspaper = this.items[itemIndex];
          this.$store.dispatch('updateNewspaper', updatedNewspaper);

        }
        console.log(this.user.lastVote)

      },
      voteModRep(item){
        var itemIndex = this.items.indexOf(item);
        if (this.user.lastVote[itemIndex]==''){
          this.items[itemIndex].votesModRep++;
          this.user.lastVote[itemIndex]='modRep';
          const updatedNewspaper = this.items[itemIndex];
          this.$store.dispatch('updateNewspaper', updatedNewspaper);
          this.$store.dispatch('updateUserVotes', this.user.lastVote)

        }
        else if (this.user.lastVote[itemIndex]=='lib'){
          this.items[itemIndex].votesModRep++;
          this.items[itemIndex].votesLib--;
          this.user.lastVote[itemIndex]='modRep';
          if (this.items[itemIndex].biasTowards == 'Liberal'){
            this.items[itemIndex].topVote--;
          }
          const updatedNewspaper = this.items[itemIndex];
          this.$store.dispatch('updateNewspaper', updatedNewspaper);
          this.$store.dispatch('updateUserVotes', this.user.lastVote)

        }
        else if (this.user.lastVote[itemIndex]=='modLib'){
          this.items[itemIndex].votesModRep++;
          this.items[itemIndex].votesModLib--;
          this.user.lastVote[itemIndex]='modRep';
          if (this.items[itemIndex].biasTowards == 'Moderate Liberal'){
            this.items[itemIndex].topVote--;
          }
          const updatedNewspaper = this.items[itemIndex];
          this.$store.dispatch('updateNewspaper', updatedNewspaper);
          this.$store.dispatch('updateUserVotes', this.user.lastVote)

        }
        else if (this.user.lastVote[itemIndex]=='Centrist'){
          this.items[itemIndex].votesModRep++;
          this.items[itemIndex].votesCentrist--;
          this.user.lastVote[itemIndex]='modRep';
          if (this.items[itemIndex].biasTowards == 'Centrist'){
            this.items[itemIndex].topVote--;
          }
          const updatedNewspaper = this.items[itemIndex];
          this.$store.dispatch('updateNewspaper', updatedNewspaper);
          this.$store.dispatch('updateUserVotes', this.user.lastVote)

        }
        else if (this.user.lastVote[itemIndex]=='rep'){
          this.items[itemIndex].votesModRep++;
          this.items[itemIndex].votesRep--;
          this.user.lastVote[itemIndex]='modRep';
          if (this.items[itemIndex].biasTowards == 'Republican'){
            this.items[itemIndex].topVote--;
          }
          const updatedNewspaper = this.items[itemIndex];
          this.$store.dispatch('updateNewspaper', updatedNewspaper);
          this.$store.dispatch('updateUserVotes', this.user.lastVote)

        }
        else{
          console.log("Spam prevention");
        }
        if (this.items[itemIndex].votesModRep >= this.items[itemIndex].topVote){
          this.items[itemIndex].topVote = this.items[itemIndex].votesModRep;
          this.items[itemIndex].biasTowards = 'Moderate Republican';

          const updatedNewspaper = this.items[itemIndex];
          this.$store.dispatch('updateNewspaper', updatedNewspaper);

        }
        console.log(this.user.lastVote)

      },
      voteRep(item){
        var itemIndex = this.items.indexOf(item);
        if (this.user.lastVote[itemIndex]==''){
          this.items[itemIndex].votesRep++;
          this.user.lastVote[itemIndex]='rep';
          const updatedNewspaper = this.items[itemIndex];
          this.$store.dispatch('updateNewspaper', updatedNewspaper);
          this.$store.dispatch('updateUserVotes', this.user.lastVote)

        }
        else if (this.user.lastVote[itemIndex]=='lib'){
          this.items[itemIndex].votesRep++;
          this.items[itemIndex].votesLib--;
          this.user.lastVote[itemIndex]='rep';
          if (this.items[itemIndex].biasTowards == 'Liberal'){
            this.items[itemIndex].topVote--;
          }
          const updatedNewspaper = this.items[itemIndex];
          this.$store.dispatch('updateNewspaper', updatedNewspaper);
          this.$store.dispatch('updateUserVotes', this.user.lastVote)

        }
        else if (this.user.lastVote[itemIndex]=='modLib'){
          this.items[itemIndex].votesRep++;
          this.items[itemIndex].votesCentrist--;
          this.user.lastVote[itemIndex]='rep';
          if (this.items[itemIndex].biasTowards == 'Moderate Liberal'){
            this.items[itemIndex].topVote--;
          }
          const updatedNewspaper = this.items[itemIndex];
          this.$store.dispatch('updateNewspaper', updatedNewspaper);
          this.$store.dispatch('updateUserVotes', this.user.lastVote)

        }
        else if (this.user.lastVote[itemIndex]=='Centrist'){
          this.items[itemIndex].votesRep++;
          this.items[itemIndex].votesModRep--;
          this.user.lastVote[itemIndex]='rep';
          if (this.items[itemIndex].biasTowards == 'Centrist'){
            this.items[itemIndex].topVote--;
          }
          const updatedNewspaper = this.items[itemIndex];
          this.$store.dispatch('updateNewspaper', updatedNewspaper);
          this.$store.dispatch('updateUserVotes', this.user.lastVote)

        }
        else if (this.user.lastVote[itemIndex]=='modRep'){
          this.items[itemIndex].votesRep++;
          this.items[itemIndex].votesModRep--;
          this.user.lastVote[itemIndex]='rep';
          if (this.items[itemIndex].biasTowards == 'Moderate Liberal'){
            this.items[itemIndex].topVote--;
          }
          const updatedNewspaper = this.items[itemIndex];
          this.$store.dispatch('updateNewspaper', updatedNewspaper);
          this.$store.dispatch('updateUserVotes', this.user.lastVote)

        }
        else{
          console.log("Spam prevention");
        }
        if (this.items[itemIndex].votesRep >= this.items[itemIndex].topVote){
          this.items[itemIndex].topVote = this.items[itemIndex].votesRep;
          this.items[itemIndex].biasTowards = 'Republican';
          const updatedNewspaper = this.items[itemIndex];
          this.$store.dispatch('updateNewspaper', updatedNewspaper);
        }
        console.log(this.user.lastVote)

      }
    }
  }
</script>
