<template>
    <div class="uni-async-error" @click="_onClick">
    </div>
</template>
<style>
    .uni-async-error {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        color: #999;
        padding: 100px 0;
        text-align: center;
    }
</style>
<script>
    export default {
        name: 'CustomAsyncError',
        methods: {
            _onClick() {
                window.location.reload()
            }
        }
    }
</script>
