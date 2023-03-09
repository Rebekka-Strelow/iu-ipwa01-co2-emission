<template>
    <el-collapse>
        <el-collapse-item :title="question" :name="id">
            <p>{{ answer }}</p>
        </el-collapse-item>
    </el-collapse>

</template>

<script>

export default {
    name: "FaqElement",
    props: ["id", "question", "answer"]
}

</script>

<style scoped>

</style>