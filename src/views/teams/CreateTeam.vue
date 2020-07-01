<template>
  <div>
    <div class="form-group row justify-content-center" >
      <input v-model="teamData.interests" type="text" id="title" placeholder="관심 분야를 입력해주세요." class="inputs" autofocus>
    </div>
    <test/>
  </div>
</template>

<script>
import test from '@/components/test'
export default {
  name: 'CreateTeam',
  components: {
    test,
  },
  data() {
    return {
      teamData: {
        name: null,
        oneline_description: null,
        description: null,
        leader: null,
        members: null,
        // 관심 분야
        interests: null,
        // 현재 팀원 수
        currentMembers: null,
        // 목표 팀원 수
        finalMembers: null,
        // 주 모임지역
        residence: null,
        // 주 사용 언어/프레임워크
        front_language: null,
        back_language: null,
        // 팀 관심
        like_users: null,
      }
    }
  }
  
  
}
</script>

<style scoped>
.inputs {
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #757575;
  width: 70%;
  padding: 0.5rem;

}
.inputs:focus {
  outline: none;
}
</style>