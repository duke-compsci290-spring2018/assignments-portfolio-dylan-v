//Dylan Vanelli
//Instantiate the Vue instance
var app = new Vue({
    //Add in some example data
    data: {
        boards: [{title: "Groceries", newCard:"", items:[{title: "Get milk.", visible: false, created:"3/9/18", newComment:"", comments:[]},{title: "Pick up bread.", visible: false, created:"3/9/18", newComment:"", comments:[]}], visible:true},
                 {title: "To-Dos", newCard:"",items:[{title: "Walk the dog.", visible: false, created:"3/9/18", newComment:"", comments:[]},{title: "Fill up the tank.", visible: false, created:"3/9/18", newComment:"", comments:[]}], visible:true},
                 {title: "Misc.", newCard:"",items:[{title: "Check out the new TV show.", visible: false, created:"3/9/18", newComment:"", comments:[]},{title: "Download a new app.", visible: false, created:"3/9/18", newComment:"", comments:[]}], visible:true}],
        items: [],
        newBoard: "",
    },
    methods: {
        //Add a board; pushes to boards array within Vue instance
        addBoard: function() {
          var board= this.newBoard;
            if (board){
                this.boards.push({
                    title: this.newBoard,
                    newCard: "",
                    newComment: "",
                    items: [],
                    comments:[],
                    visible: true,
                  });
            }
            this.newBoard="";
        },
        //Finds index of current board and splices it from the boards array
        deleteBoard: function(board) {
            this.boards.splice(this.boards.indexOf(board), 1);
        },
        //Toggles visibility, which is a div controled by an if statement
        showBoard: function(board) {
            board.visible = !board.visible;
        },
        //Find index of current board and swaps its location in the boards array with the board to the left
        shiftLeft: function(board) {
            var index = this.boards.indexOf(board);
            if (index != 0) {
                this.boards.splice(index-1, 0, board);
                this.boards.splice(index+1, 1);
            }
        },
        //Same as above, but the the right
        shiftRight: function(board) {
            var index = this.boards.indexOf(board);
            if (index != this.boards.length -1) {
                this.boards.splice(index+2, 0, card);
                this.boards.splice(index, 1);
            }
        },
        //Add a card to a specific board. Pushes to items array within each board
        addCard: function(board) {
            var dateObj = new Date();
            var month = dateObj.getUTCMonth() + 1;
            var day = dateObj.getUTCDate();
            var year = dateObj.getUTCFullYear();
            newdate = month+"/"+day+"/"+year;
            var item = board.newCard.trim();
            if (item) {
                board.items.push({
                    title: item,
                    visible: false,
                    created: newdate,
                    newComment:"",
                    comments:[],
                });
            }
            board.newCard="";
        },
        //Add any number of comments to the specific card within a board; pushes to comments array within the specifc card
        addComment: function(card){
          var comment = card.newComment.trim();
          console.log(comment);
          if (comment) {
              card.comments.push({
                  title: comment,
              });
          }
          card.newComment="";

        },
        //Splice card from the card array within a specific board
        deleteCard: function(board, item) {
            board.items.splice(board.items.indexOf(item), 1);
        },
        //Toggles visibility, div controlled by an if statement (v-if)
        showCard: function(item) {
            item.visible =!item.visible;
        },
        //Picks random index within the gradient array and sets that to the background style
        changeBackground: function(e){
          var colorArray= ["#4286f4", "#8022e5", "#efac0e", "#09c495", "#dddddd", "#d80000"]
          var colorArr = colorArray[Math.floor(Math.random()*colorArray.length)];
          document.getElementsByTagName("body")[0].style.background=colorArr;
          e.preventDefault();
        },
    },
})
app.$mount('#trillo');
