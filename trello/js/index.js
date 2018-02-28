//Global variables used for storage
var B1 = [];
var B2 = [];
var B3 = [];

Vue.component("in-board-1", {
    projectName: "Board 1",
    props: ["board1"],
    template: "#in-board-1",
    data: function(){
      return {
        newTask: ""
      }
    },
    methods:{
        addTask: function(e){
            var task = this.newTask.trim();
            if(!B1.includes(task)){
                B1.push(task);
            } else{
                B1.push(task + " ");
            }
            this.newTask = ""
            e.preventDefault();
        },
        deleteTask: function(index){
            B1.splice(index, 1);
        },
        toBoard2: function(task, index){
           B2.push(task)
           B1.splice(index,1);
        }
    }
});

Vue.component("in-board-2", {
    projectName: "Board 2",
    props: ["board2"],
    template: "#in-board-2",
    data: function(){
      return {
        newTask: ""
      }
    },
    methods:{
        addTask: function(e){
            var task = this.newTask.trim();
            if(!B2.includes(task)){
                B2.push(task);
            } else{
                B2.push(task + " ");
            }
            this.newTask = ""
            e.preventDefault();
        },
        deleteTask: function(index){
            B2.splice(index, 1);
        },
        toBoard1: function(task, index){
            B1.push(task)
            B2.splice(index,1);
        },
        toBoard3: function(task, index){
            B3.push(task)
            B2.splice(index,1);
        }
    }
});

Vue.component("in-board-3", {
    projectName: "Board 3",
    props: ["board3"],
    template: "#in-board-3",
    data: function(){
      return {
        newTask: ""
      }
    },
    methods:{
        addTask: function(e){
            var task = this.newTask.trim();
            if(!B3.includes(task)){
                B3.push(task);
            } else{
                B3.push(task + " ");
            }
            this.newTask = ""
            e.preventDefault();
        },
        deleteTask: function(index){
            B3.splice(index, 1);
        },
        toBoard2: function(task, index){
           B2.push(task)
           B3.splice(index,1);
        }
    }
});

new Vue({
    el: "#projectManager",
    data: {
        board1List: B1,
        board2List: B2,
        board3List: B3,
    },
});
