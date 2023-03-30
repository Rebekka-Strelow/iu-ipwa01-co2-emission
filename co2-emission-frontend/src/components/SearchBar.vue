<template>
    <div>

        <div v-if="filtertext != ''" class="el-alert el-alert--info is-light" role="alert">
            <div class="el-alert__content">
                <span class="el-alert__title" v-text="'Gefiltert nach:' + this.filtertext"></span>
            </div>
            </div>


        <!-- LTR-Anordnung -->
        <div v-if="this.alignment=='ltr'" class="searchbar">
                <el-input v-model="input" @clear="fireReset" placeholder="Suchtext" clearable />
                <el-button @click="fireSearch" plain>Suchen</el-button>
        </div>
        <!-- RTL-Anordnung -->
        <div v-if="this.alignment=='rtl'" class="searchbar">
                <el-button @click="fireSearch" plain>Suchen</el-button>
                <el-input v-model="input" @clear="fireReset" placeholder="Suchtext" clearable />
        </div>


    </div>
</template>
<script>
export default {
    name: "SearchBar",
    props: [
        "type",
        "alignment"
    ],
    methods: {
        fireSearch() {
            if (this.input.trim().length == 0) {
                this.input = "";
                this.filtertext = "";
                return;
            }

            this.filtertext = this.input;
            this.$emit('search', this.type, this.input);
        },
        fireReset() {
            this.filtertext = "";
            this.$emit('reset', this.type);
        }
    },
    data: () => ({
        input: "",
        filtertext: "",
    })
}
</script>
<style scoped>
.searchbar {
    display: flex;
}

.el-input {
    flex-grow: 2;
}
</style>