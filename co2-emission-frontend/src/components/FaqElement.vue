<template>
      <el-collapse-item :title="question" :name="id">
        <p>{{answer}}</p>
    </el-collapse-item>


</template>

<script>

export default {
    name: "FaqElement",
    props: ["id", "question", "answer"]
}

</script>

<style scoped>


</style>