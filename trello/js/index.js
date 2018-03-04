//Global variables used for storage
var B1 = [];
var B2 = [];
var B3 = [];

//Need to figure out how to make new Vue components with a button...
//Component for board 1 (far left)
Vue.component("in-board-1", {
    projectName: "Board 1",
    props: ["bone"],
    template: "#in-board-1",
    //Data structure still very simple, just a task name
    data: function(){
      return {
        newTask: ""
      }
    },
    //Add new task to task ul
    methods:{
        addTask: function(e){
            var task = this.newTask;
            if(!B1.includes(task)){
                B1.push(task);
            } else{
                B1.push(task + " ");
            }
            this.newTask = ""
            e.preventDefault();
        },
        //Remove task from task ul by splicing it from the data array
        deleteTask: function(index){
            B1.splice(index, 1);
        },
        //Removes and adds task from one array to another. Not sure how to generalize this because HTML cannot directly access B1,B2, B3
        toBoard2: function(task, index){
           B2.push(task)
           B1.splice(index,1);
        }
    }
});

//Same as above, but different move functions specific to board-2's location
Vue.component("in-board-2", {
    projectName: "Board 2",
    props: ["btwo"],
    template: "#in-board-2",
    data: function(){
      return {
        newTask: ""
      }
    },
    methods:{
        addTask: function(e){
            var task = this.newTask;
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
//Same as above, but different move functions specific to board-3's location
Vue.component("in-board-3", {
    projectName: "Board 3",
    props: ["bthree"],
    template: "#in-board-3",
    data: function(){
      return {
        newTask: ""
      }
    },
    methods:{
        addTask: function(e){
            var task = this.newTask;
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

//Instantiate new Vue instance. Data object holds large arrays that contain task information
new Vue({
    el: "#projectManager",
    data: {
        board1List: B1,
        board2List: B2,
        board3List: B3,
    },
});
