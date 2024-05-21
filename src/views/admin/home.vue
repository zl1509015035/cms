<script setup>
import '@/assets/admin/css/home.css'
import HomeSide from '@/components/admin/home/HomeSide.vue'
</script>

<template>
    <div class="dr-home">

        <div class="header">

        </div>

        <div class="main">
            <HomeSide />

            <dic class="content">
                <router-view />
            </dic>
        </div>
    </div>
</template>

<style scoped></style>