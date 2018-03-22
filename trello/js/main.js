//Dylan Vanelli
//Instantiate the Vue instance
var app = new Vue({
    //Add in some example data
    data: {
        boards: [{title: "Groceries", newCard:"", items:[{title: "Get milk.", visible: false, created:"3/9/18", newComment:"", comments:[], newToDo:"", todos:[], about:""},{title: "Pick up bread.", visible: false, created:"3/9/18", newComment:"", comments:[],newToDo:"", todos:[], about:""}], visible:true, color: "#f7f7f7", newColor:""},
                 {title: "To-Dos", newCard:"",items:[{title: "Walk the dog.", visible: false, created:"3/9/18", newComment:"", comments:[], newToDo:"", todos:[],about:""},{title: "Fill up the tank.", visible: false, created:"3/9/18", newComment:"", comments:[],newToDo:"", todos:[], about:""}], visible:true, color: "#f7f7f7",newColor:""},
                 {title: "Misc.", newCard:"",items:[{title: "Check out the new TV show.", visible: false, created:"3/9/18", newComment:"", comments:[], newToDo:"", todos:[],about:""},{title: "Download a new app.", visible: false, created:"3/9/18", newComment:"", comments:[],newToDo:"", todos:[]}], visible:true, color: "#f7f7f7",newColor:""}],
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
                    // newComment: "",
                    // comments:[],
                    items: [],
                    visible: true,
                    color: "#f7f7f7",
                    newColor: "",
                  });
            }
            this.newBoard="";
        },
        editTitle: function(board){
          board.title = board.newTitle.trim();
          board.newTitle="";
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
                this.boards.splice(index+2, 0, board);
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
                    newToDo:"",
                    todos:[],
                    about:"",
                });
            }
            board.newCard="";
        },
        addToDo: function(card){
          var todo = card.newToDo.trim();
          console.log(todo);
          if (todo) {
              card.todos.push({
                  title: todo,
              });
          }
          card.newToDo="";
        },
        deleteToDo: function(card, todo) {
            card.todos.splice(card.todos.indexOf(todo), 1);
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
        deleteComment: function(card, comment) {
            card.comments.splice(card.comments.indexOf(comment), 1);
        },
        editAbout: function(card){
          card.about = card.newAbout.trim();
          card.newAbout="";
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
        changeColor: function(board){
          console.log(board.newColor)
          board.color=board.newColor;
          newColor="";
        },
    },
})
app.$mount("#trillo");
