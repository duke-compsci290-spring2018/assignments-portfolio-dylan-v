<template>
  <div id="app" v-bind:style="{background: backgroundColor}">
    <div id="quiz">
      <div id="top">
        <h1 v-show="mode=='init'">Choose a quiz below:</h1>
        <h1 v-show="mode=='takeQuiz' || mode=='submit'"> Current quiz: {{quizArr[indexQuiz].quizName}} </h1>
        <h1 id="question" v-show="mode=='takeQuiz'">{{ quizArr[indexQuiz].questionArr[indexCurrQ].question }}</h1>
        <h1 v-show="mode=='endQuiz'">Quiz complete! You got {{ percentage }}% ({{ total + "/" + (quizArr[indexQuiz].questionArr.length-1) }}) correct.</h1>
      </div>
      <a class="button" v-on:click="init(quizArr.indexOf(quiz))" v-show="mode=='init'"v-for="quiz in quizArr":key="JSON.stringify(quiz)">
         {{quiz.quizName}}
      </a>
      <a class="button" v-on:click="submit(optionIndex)" v-show="mode=='takeQuiz' || mode=='submit'" v-for="(option, optionIndex) in quizArr[indexQuiz].questionArr[indexCurrQ].options" :key="JSON.stringify(option)">
         {{option}}
      </a>
      <a class="button" v-on:click="restart" v-show="mode=='endQuiz' "> Take another quiz!</a>
      <div id="bottom" v-show="mode=='takeQuiz' || mode=='submit'">
        <div>
          <button class="wrongAnswer" v-on:click="resubmit()" v-show="mode=='takeQuiz' || mode=='submit'" :class="{greyedOut: wrongIndexArr.length == 0}">
          <p>You got a question wrong! Go back.</p>
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
      percentage:0,
    }
  },
  methods: {
    submit(index) { //Compare right answer index specified in JSON to index that user selected
      if (this.quizArr[this.indexQuiz].questionArr[this.indexCurrQ].correctIndex == index) {
        this.total++; //Increment total for percentage at end of quiz
        if (this.indexCurrQ == this.quizArr[this.indexQuiz].questionArr.length-1){
          this.total--;
          this.percentage= Math.floor(this.total/(this.quizArr[this.indexQuiz].questionArr.length-1 * 100));
          var quizLen = this.quizArr[this.indexQuiz].questionArr.length - 1;
          this.percentage= Math.floor((this.total/quizLen)*100);
          console.log("final score: "+this.total);
          console.log("quiz length: "+ quizLen);
          console.log(this.percentage);
        }
        if (this.indexCurrQ == this.quizArr[this.indexQuiz].questionArr.length-2){
          this.mode="submit";
          console.log("Submit mode active");
        }
        console.log("New total: " + this.total);
      } else {
        console.log("Wrong answer at index: " + index);
        console.log("Wrong answer added to wrongIndexArr");
        this.wrongIndexArr.push(index); //Add index of wrong answer to array so that user can return later
      }
      if (this.indexCurrQ < this.quizArr[this.indexQuiz].questionArr.length-1) { //Keep track of question index
          this.indexCurrQ = this.indexNextQ; //Advance to next question
          this.indexNextQ++;
      } else { //Reached the end of the quiz, clears information and allow user to reset
        var emptyArry = this.wrongIndexArr;
        this.wrongIndexArr=[]; //Clear wrong answers
        this.mode = "endQuiz";
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
