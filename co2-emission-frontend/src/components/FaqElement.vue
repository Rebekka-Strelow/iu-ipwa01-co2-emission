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

<style>

.el-collapse-item__header {
    line-height: 1 !important;
}.el-collapse-item {
    line-height: 1 !important;
}

</style>