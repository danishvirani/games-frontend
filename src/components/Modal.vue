<template>
  <div class='modal-backdrop'>
    <div class='modal'>
      <div class='modal-header'>
        <h2>{{requestedGame.name}}</h2>
        <button type='button' class='btn-close' @click='close'>
          x
        </button>
      </div>

      <div class='modal-body'>

        <img v-bind:src='requestedGame.url' v-bind:alt='requestedGame.name' class='img-size' v-if='!requestedGame.url.includes("missing.png")'>
        <img src='@/assets/game-placeholder.png' v-bind:alt='requestedGame.name' class='img-size' v-else>

        <br/>
        <button type='button' class='btn-green' @click='like(requestedGame.id)'>Like</button>
        <p v-if='updated'>{{updatedLikes}}</p>
        <p v-else>{{requestedGame.likes}}</p>
        <p v-if='message.message == "error"' class="red">You can like a game every 5 minutes</p>
        <p v-else>{{message.message}}</p>
      </div>

      <div class='modal-footer'>
        {{requestedGame.description}}
        <button type='button' class='btn-green' @click='close'>
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Modal',
  props: ['requestedGame', 'userIP'],
  data() {
    return {
      message: '',
      errorMsg: '',
      updated: false,
      updatedLikes: 0,
    }
  },
    methods: {
      close() {
        this.$emit('close')
        this.message = ''
        this.updated = false
      },
      like(gameId) {
        const headers = {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
        axios
          .post('http://localhost:8080/likes',
            {
              'id': gameId,
              'ipAddress': this.userIP
            }, {headers: headers})
          .then((response) => {
            this.message = response.data
            if (response.data.message == 'success') {
              this.updated = true
              this.updatedLikes = this.requestedGame.likes + 1
            }
          })
          .catch((error) => {
            this.errorMsg = error
          })
      },
    },
}
</script>
<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

  .img-size {
    height: 50vh;
  }

  .red {
    color: red;
  }
</style>
