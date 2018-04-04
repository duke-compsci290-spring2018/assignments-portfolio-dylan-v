<template>
  <div id="app" v-bind:style="{background: backgroundColor}">
    <div id="quiz">
      <div id="top">
        <h1 v-show="mode=='init'">Choose a quiz below:</h1>
        <h1 v-show="mode=='takeQuiz'"> Current quiz: {{quizArr[indexQuiz].quizName}} </h1>
        <h1 id="question" v-show="mode=='takeQuiz'">{{ quizArr[indexQuiz].questionArr[indexCurrQ].question }}</h1>
        <h1 v-show="mode=='endQuiz'">Quiz complete! You got {{ Math.floor(total/quizArr[indexQuiz].questionArr.length * 100) }}% ({{ total + "/" + quizArr[indexQuiz].questionArr.length }}) correct.</h1>
      </div>
      <a class="button" v-on:click="init(quizArr.indexOf(quiz))" v-show="mode=='init'"v-for="quiz in quizArr":key="JSON.stringify(quiz)">
         {{ quiz.quizName }}
      </a>
      <a class="button" v-on:click="submit(optionIndex)" v-show="mode=='takeQuiz'" v-for="(option, optionIndex) in quizArr[indexQuiz].questionArr[indexCurrQ].options" :key="JSON.stringify(option)">
         {{ option }}
      </a>
      <a class="button" v-on:click="restart" v-show="mode=='endQuiz'"> Take another quiz!</a>
      <div v-show="mode=='takeQuiz' || mode=='endQuiz'" id="bottom">
        <div>
          <p v-show="mode=='takeQuiz'">Question {{ indexCurrQ + 1 + " / " + quizArr[indexQuiz].questionArr.length }}</p>
          <button class="wrongAnswer" v-on:click="resubmit()" v-show="mode=='takeQuiz'" :class="{greyedOut: wrongIndexArr.length == 0}">
          <p>You got a question wrong! Try again.</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import quizzes from "./assets/quizzes.json";

export default {
  name: 'app',
  data () {
    return {
      mode: "init",
      backgroundColor: "",
      quizArr: quizzes,
      indexQuiz: 0,
      indexCurrQ: 0,
      indexNextQ: 1,
      wrongIndexArr: [],
      total: 0,
      quizColor: "",
      fontType:"",
    }
  },
  methods: {
    submit(index) { //Compare right answer index specified in JSON to index that user selected
      if (this.quizArr[this.indexQuiz].questionArr[this.indexCurrQ].correctIndex == index) {
        this.total++;
        console.log("New total: " + this.total);
      } else {
        console.log("Wrong answer at index: " + index);
        console.log("Wrong answer added to wrongIndexArr");
        this.wrongIndexArr.push(index);
      }
      if (this.indexCurrQ < this.quizArr[this.indexQuiz].questionArr.length-1) { //Keep track of question index
          this.indexCurrQ = this.indexNextQ;
          this.indexNextQ++;
      } else { //Reached the end of the quiz, clears information and allow user to reset
        this.mode = "endQuiz";
        var emptyArry = this.wrongIndexArr;
        this.wrongIndexArr=[];
        this.indexCurrQ = 0;
        this.indexNextQ = 1;
        console.log("Reset inital values");
      }
    },
    resubmit() { //Go back to index of wrong answer, then return to current
      if (this.wrongIndexArr.length > 0) {
        var currentQuestion = this.indexCurrQ;
        this.indexNextQ = currentQuestion; //Remember index of current question
        this.indexCurrQ = this.wrongIndexArr.shift(); //Go back to wrong question, clear it from arr, then return to current question
        console.log("Current index at " + this.indexNextQ);
        console.log("Going back to index " + currentQuestion);
      }
    },
    init(index) { //Based on what the user selects, set up approperiate quiz
      //Modify background based on index
      if (index == 0){
        this.backgroundColor = "linear-gradient(to right, #5f2c82, #49a09d)";
      }
      if (index == 1){
        this.backgroundColor = "linear-gradient(to right, #fe8c00, #f83600)";
      }
      if (index == 2){
        this.backgroundColor = "linear-gradient(to right, #ff9966, #ff5e62)";
      }
      if (index == 3){
        this.backgroundColor = "linear-gradient(to right, #0575e6, #021b79)";
      }
      this.indexQuiz = index; //Specify quiz for use in other function
      this.mode = "takeQuiz";
    },
    restart() { //Reset app variables to initial values
      this.mode = "init";
      this.total = 0;
      this.backgroundColor = "linear-gradient(to right, #4568dc, #b06ab3)"; //Reset background color
      console.log("Score and background reset");
      console.log("System initialized");
    }
  }
}
</script>
<style src="./assets/css/style.css"></style>
