<template>
  <NavList :list="list" />
</template>

<script>
import NavList from "./NavList.vue";
export default {
    components: {
        NavList,
    },
    data(){
        return {
            list: [
                {name: "aaaaaa", isSelected: false},
                {name: "bbbbbb", isSelected: false},
                {name: "cccccc", isSelected: true, children: [
                    {name: "cc-1", isSelected: true, children: [
                        {name: "cc-1-1", isSelected: false},
                        {name: "cc-1-2", isSelected: false},
                        {name: "cc-1-3", isSelected: false},
                    ]},
                    {name: "cc-2", isSelected: false},
                    {name: "cc-3", isSelected: false},
                ]},
                {name: "dddddd", isSelected: false},
            ]
        }
    }
}
</script>

<style>

</style>