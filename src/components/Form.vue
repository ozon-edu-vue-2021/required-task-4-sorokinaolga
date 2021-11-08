<template>
  <div class="form">
    <form
      autocomplete="off"
      class="form"
    >
      <h2>Личные данные</h2>
      <div class="row">
        <div class="col">
          <label for="surname">Фамилия </label>
          <input
            v-model="formData.surname"
            id="surname"
            placeholder=""
          />
        </div>
        <div class="col">
          <label for="name">Имя </label>
          <input
            v-model="formData.name"
            id="name"
            placeholder=""
          />
        </div>
        <div class="col">
          <label for="patronym">Отчество </label>
          <input
            v-model="formData.patronym"
            id="patronym"
            placeholder=""
          />
        </div>
      </div>
      <div class="row">
        <label for="birthdate">Дата рождения </label>
        <input
          v-model="formData.birthdate"
          type="date"
          id="birthdate"
        />
      </div>
      <div class="row">
        <label for="email">Email </label>
        <input
          v-model="formData.email"
          id="email"
          placeholder=""
        />
      </div>
      <h3>Пол</h3>
      <div class="row"> 
        <input v-model="formData.gender" type="radio" id="gender" name="gender" value="man" />
        <label for="gender">Мужской</label>

        <input v-model="formData.gender" type="radio" id="gender" name="gender" value="woman" />
        <label for="gender">Женский</label>
      </div>
      <h2>Паспортные данные</h2>
      <div class="row nationality-selector" v-click-outside="hideDropdown">
        <label for="nationality">Гражданство</label>
        <input 
          v-model="searchNationality"
          id="nationality"
          @focus="isDropdownOpen = true"
        />
          <div 
            v-if="isDropdownOpen"
            class="nationality-selector__dropdown"
          >
            <ul 
              v-if="citizenship.length"
            >
              <li
                v-for="item in citizenship"
                :key="item.id"
                @click="selectNationality(item.nationality)"
              >
                {{ item.nationality }}
              </li>
            </ul>
          </div>
      </div>
      <div v-if="formData.nationality === 'Russia'" class="row">
        <div class="col">
          <label for="series">Серия паспорта </label>
          <input
            v-model="formData.series"
            id="series"
            placeholder=""
          />
        </div>
        <div class="col">
          <label for="number">Номер паспорта </label>
          <input
            v-model="formData.number"
            id="number"
            placeholder=""
          />
        </div>
        <div class="col">
          <label for="date-of-issue">Дата выдачи </label>
          <input
            v-model="formData.dateOfIssue"
            type="date"
            id="date-of-issue"
          />
        </div>
      </div>
      <div v-else-if="formData.nationality !== ''">
        <div class="row">
          <div class="col">
            <label for="latin-surname">Фамилия на латинице </label>
            <input
              v-model="formData.latinSurname"
              id="latin-surname"
              placeholder=""
            />
          </div>
          <div class="col">
            <label for="latin-name">Имя на латинице </label>
            <input
              v-model="formData.latinName"
              id="latin-name"
              placeholder=""
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="number">Номер паспорта </label>
            <input
              v-model="formData.number"
              id="number"
              placeholder=""
            />
          </div>
          <div class="col">
            <label for="country">Страна выдачи</label>
            <select v-model="formData.country" id="country">
              <option disabled value="">Страна выдачи</option>
              <option v-for="item in citizenship" :key="item.id">{{ item.nationality }}</option>
            </select>
          </div>
          <div class="col">
            <label for="type-passport">Тип паспорта </label>
              <select v-model="formData.typePassport" id="type-passport">
              <option disabled value="">Страна выдачи</option>
              <option v-for="item in passportTypes" :key="item.id">{{ item.type }}</option>
            </select>
          </div>
        </div>
      </div>
      <h3>Меняли ли фамилию или имя?</h3>
      <div class="row"> 
        <input v-model="formData.isChangeName" type="radio" id="change-name" name="change-name" :value="false" />
        <label for="change-name">Нет</label>

        <input v-model="formData.isChangeName" type="radio" id="change-name" name="change-name" :value="true" />
        <label for="change-name">Да</label>
      </div>
      <div v-if="formData.isChangeName" class="row">
        <div class="col">
          <label for="last-surname">Предыдущая фамилия </label>
          <input
            v-model="formData.lastSurname"
            id="last-surname"
            placeholder=""
          />
        </div>
        <div class="col">
          <label for="last-name">Предыдущее Имя </label>
          <input
            v-model="formData.lastName"
            id="last-name"
            placeholder=""
          />
        </div>
      </div>
      <button
        @click.prevent="submitData"
        class="button"
        type="submit"
      >
        Отправить
      </button>
    </form>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import { throttle } from '../throttle.js';
import citizenship from '../assets/data/citizenships.json';
import passportTypes from '../assets/data/passport-types.json';

export default {
  directives: {
    ClickOutside,
  },
  data() {
    return {
      citizenship: citizenship,
      passportTypes: passportTypes,
      formData: {
        surname: '',
        name: '',
        patronym: '',
        birthdate: '',
        email: '',
        gender: 'man',
        nationality: '',
        series: '',
        number: '',
        dateOfIssue: '',
        latinSurname: '',
        latinName: '',
        country: '',
        typePassport: '',
        isChangeName: false,
        lastSurname: '',
        lastName: ''
      },
      isDropdownOpen: false,
      searchNationality: '',
      throttledSearchNationality: null,
    };
  },
  created() {
    this.throttledSearchNationality = throttle(this.getNationality, 500);
  },
  methods: {
    submitData() {
      console.log(JSON.stringify(this.formData));
    },
    hideDropdown() {
      this.isDropdownOpen = false;
    },
    selectNationality(selectedItem) {
      this.formData.nationality = selectedItem;
      this.searchNationality = selectedItem;
      this.isDropdownOpen = false;
    },
    getNationality(searchWord) {
      this.citizenship = citizenship.filter((item) =>
        item.nationality.toLowerCase().includes(searchWord.toLowerCase())
      );
    }
  },
  watch: {
    searchNationality(newValue) {
      this.throttledSearchNationality(newValue);
    }
  }
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
  padding-bottom: 40px;
}
.row {
  display: flex;
  gap: 10px;
}
.col {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.nationality-selector {
  position: relative;
}
.nationality-selector input {
  width: 200px;
  border: 2px solid #DEDFE7;
  border-radius: 4px;
}
.nationality-selector__dropdown ul {
  margin: 0;
  padding: 0;
	width: 200px;
	border: 1px solid #DEDFE7;
	position: absolute;
	background: #fff;
  top: 20px;
  left: 106px;
  height: 100px;
  overflow: auto;
}
.nationality-selector__dropdown li {
  list-style: none;
	cursor: pointer;
	padding: 5px 15px;
}
.nationality-selector__dropdown li:hover {
  background-color: #DEDFE7;
}
.button {
  align-self: flex-end;
  border-radius: 4px;
  font-size: 18px;
  background-color: transparent;
  border: 2px solid #DEDFE7;
  padding: 10px 20px;
}
.button:hover {
  background-color: #265AF7;
  border-color: #265AF7;
  color: #EFF3FF;
}
</style>
