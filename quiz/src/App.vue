<template>
  <div id="app" v-bind:style="{background: backgroundColor}">

    <div id="quiz">
      <div id="top-quiz">
        <h1 v-show="mode=='takeQuiz'"> Current quiz: {{quizArr[quizIndex].quizName}} </h1>
        <h1 id="question" v-show="mode=='takeQuiz'">{{ quizArr[quizIndex].questionArr[questionIndex].question }}</h1>
        <h1 v-show="mode=='init'">Choose a quiz below:</h1>
        <h2 v-show="mode=='endQuiz'">{{ total + "/" + quizArr[quizIndex].questionArr.length }} answered correctly</h2>
        <h1 v-show="mode=='endQuiz'">You got {{ Math.floor(total/quizArr[quizIndex].questionArr.length * 100) }}% correct</h1>
      </div>

      <a class="button" v-show="mode=='init'"
         v-for="quiz in quizArr"
         :key="JSON.stringify(quiz)"
         @click="init(quizArr.indexOf(quiz))">
         {{ quiz.quizName }}
      </a>

      <a class="button" v-show="mode=='takeQuiz'"
         v-for="(option, optionIndex) in quizArr[quizIndex].questionArr[questionIndex].options"
         :key="JSON.stringify(option)"
         @click="submit(optionIndex)">
         {{ option }}
      </a>

      <a class="button" v-show="mode=='endQuiz'" @click="restart"> Take another quiz!</a>

      <div v-show="mode=='takeQuiz'" id="bottom-quiz">
        <div>
          <p v-show="mode=='takeQuiz'">Question {{ questionIndex + 1 + " / " + quizArr[quizIndex].questionArr.length }}</p>

          <div @click="resubmit()" class="wrong" :class="{disabled: wrongIndexArr.length == 0}">
          <p>You got the last question wrong! Try again.</p>
          </div>
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
      quizIndex: 0,
      questionIndex: 0,
      nextQuestionIndex: 1,
      wrongIndexArr: [],
      total: 0,
    }
  },
  methods: {
    init: function(index) {
      this.quizIndex = index;
      this.mode = "takeQuiz";
      //Set background color
      if (index == 0){
        this.backgroundColor = "linear-gradient(to right, #1a2a6c, #b21f1f, #fdbb2d)";
      }
      if (index == 1){
        this.backgroundColor = "linear-gradient(to right, #396afc, #2948ff)";
      }
      if (index == 2){
        this.backgroundColor = "linear-gradient(to right, #ff9966, #ff5e62)";
      }
    },
    submit: function(index) { //Determine whether answers is right or wrong
      if (this.quizArr[this.quizIndex].questionArr[this.questionIndex].correctOption == index) {
        this.total++;
      } else {
        console.log("Wrong answer at index: " + index);
        this.wrongIndexArr.push(index);
      }

      if (this.questionIndex < this.quizArr[this.quizIndex].questionArr.length-1) {
        if (this.wrongIndexArr.length > 0 && this.wrongIndexArr[0] > this.questionIndex) {
          var goBackTo = this.wrongIndexArr[0];
          this.wrongIndexArr.shift()
          this.questionIndex = goBackTo;
        } else {
          this.questionIndex = this.nextQuestionIndex;
          this.nextQuestionIndex++;
        }
      } else {
        this.mode = "endQuiz";
        this.questionIndex = 0;
        this.nextQuestionIndex = 1;
      }
    },
    resubmit: function() {
      if (this.wrongIndexArr.length > 0) {
        this.nextQuestionIndex = this.questionIndex; //Remember index of current question
        this.questionIndex = this.wrongIndexArr.shift(); //Go back to wrong question, then return to current question
      }
    },
    restart: function() {
      this.mode = "init";
      var emptyArry = this.wrongIndexArr;
      this.wrongIndexArr=[];
      this.questionIndex = 0;
      this.nextQuestionIndex = 1;
      this.total = 0;
      this.backgroundColor = "linear-gradient(to right, #4568dc, #b06ab3)";
    }
  }
}
</script>
<style src="./assets/css/style.css"></style>
