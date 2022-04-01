<template>

  <table>
    <thead>
      <tr>
        <th>
          Name
        </th>
        <th>
          Year
        </th>
        <th>
          Publisher
        </th>
      </tr>
    </thead>
    <tbody v-for='game in games' v-bind:key='game.id'>
      <tr v-if='game.active'>
        <td class='name' @click='toggle(game)' data-test="game">
          {{ game.name }}
        </td>
        <td>
          {{ game.year }}
        </td>
        <td>
          {{ game.publisher }}
        </td>
      </tr>
    </tbody>
  </table>

  <Modal
    v-if='requestedGame'
    :requestedGame='requestedGame'
    :userIP='userIP'
    v-show='isModalVisible'
    @close='closeModal'
  />

</template>

<script>
import axios from 'axios'
import Modal from '../components/Modal.vue';

export default {
  name: 'GameList',
  created () {
    this.getGames(),
    this.getUserIP()
  },
  components: {
      Modal,
  },
  data() {
    return {
      games: null,
      errorMsg: '',
      requestedGame: false,
      isModalVisible: false,
      userIP: '',
    }
  },
  methods: {
    async getGames() {
      await axios
        .get('http://localhost:8080/games')
        .then((response) => {
          this.games = response.data.sort((a, b) => a.year - b.year)
        })
        .catch((error) => {
          this.errorMsg = error
        })
    },
    async getUserIP() {
      await axios
        .get('https://api.ipify.org?format=json')
        .then((response) => {
          this.userIP = response.data.ip
        })
        .catch((error) => {
          this.errorMsg = error
        })
    },
    closeModal() {
      this.isModalVisible = false;
    },
    toggle(game) {
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
      axios
        .post('http://localhost:8080/request', game, {headers: headers})
        .then((response) => {
          this.requestedGame = response.data
        })
        .catch((error) => {
          this.errorMsg = error
        })
      this.isModalVisible = true
    },
  },
}
</script>

<style lang="css" scoped>
.name:hover {
  text-decoration: underline;
  color: blue;
  cursor: pointer;
}

table {
  width: 100%;
}
</style>
