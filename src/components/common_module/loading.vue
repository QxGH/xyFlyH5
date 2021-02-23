<template>
    <view class="loader">
        <div class="loader-inner ball-triangle-path">
            <div class="div-1"></div>
            <div class="div-2"></div>
            <div class="div-3"></div>
        </div>
    </view>
</template>

<script>
    export default {
        name: 'loading'
    }
</script>

<style scoped>
    body {
    }

    /* Start the loader code, first, let's align it the center of screen */
    .loader {
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -mos-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        text-align: center;
        /* disable selection and cursor changes */
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: default;
    }

    @-webkit-keyframes ball-triangle-path-1 {
        33% {
            -webkit-transform: translate(25px, -50px);
            transform: translate(25px, -50px);
        }

        66% {
            -webkit-transform: translate(50px, 0px);
            transform: translate(50px, 0px);
        }

        100% {
            -webkit-transform: translate(0px, 0px);
            transform: translate(0px, 0px);
        }
    }

    @keyframes ball-triangle-path-1 {
        33% {
            -webkit-transform: translate(25px, -50px);
            transform: translate(25px, -50px);
        }

        66% {
            -webkit-transform: translate(50px, 0px);
            transform: translate(50px, 0px);
        }

        100% {
            -webkit-transform: translate(0px, 0px);
            transform: translate(0px, 0px);
        }
    }

    @-webkit-keyframes ball-triangle-path-2 {
        33% {
            -webkit-transform: translate(25px, 50px);
            transform: translate(25px, 50px);
        }

        66% {
            -webkit-transform: translate(-25px, 50px);
            transform: translate(-25px, 50px);
        }

        100% {
            -webkit-transform: translate(0px, 0px);
            transform: translate(0px, 0px);
        }
    }

    @keyframes ball-triangle-path-2 {
        33% {
            -webkit-transform: translate(25px, 50px);
            transform: translate(25px, 50px);
        }

        66% {
            -webkit-transform: translate(-25px, 50px);
            transform: translate(-25px, 50px);
        }

        100% {
            -webkit-transform: translate(0px, 0px);
            transform: translate(0px, 0px);
        }
    }

    @-webkit-keyframes ball-triangle-path-3 {
        33% {
            -webkit-transform: translate(-50px, 0px);
            transform: translate(-50px, 0px);
        }

        66% {
            -webkit-transform: translate(-25px, -50px);
            transform: translate(-25px, -50px);
        }

        100% {
            -webkit-transform: translate(0px, 0px);
            transform: translate(0px, 0px);
        }
    }

    @keyframes ball-triangle-path-3 {
        33% {
            -webkit-transform: translate(-50px, 0px);
            transform: translate(-50px, 0px);
        }

        66% {
            -webkit-transform: translate(-25px, -50px);
            transform: translate(-25px, -50px);
        }

        100% {
            -webkit-transform: translate(0px, 0px);
            transform: translate(0px, 0px);
        }
    }

    .ball-triangle-path {
        position: relative;
        -webkit-transform: translate(-25px, -25px);
        -ms-transform: translate(-25px, -25px);
        transform: translate(-25px, -25px);
    }

    .ball-triangle-path > div.div-1 {
        -webkit-animation-name: ball-triangle-path-1;
        animation-name: ball-triangle-path-1;
        -webkit-animation-delay: 0;
        animation-delay: 0;
        -webkit-animation-duration: 2s;
        animation-duration: 2s;
        -webkit-animation-timing-function: ease-in-out;
        animation-timing-function: ease-in-out;
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
    }

    .ball-triangle-path > div.div-2 {
        -webkit-animation-name: ball-triangle-path-2;
        animation-name: ball-triangle-path-2;
        -webkit-animation-delay: 0;
        animation-delay: 0;
        -webkit-animation-duration: 2s;
        animation-duration: 2s;
        -webkit-animation-timing-function: ease-in-out;
        animation-timing-function: ease-in-out;
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
    }

    .ball-triangle-path > div.div-3 {
        -webkit-animation-name: ball-triangle-path-3;
        animation-name: ball-triangle-path-3;
        -webkit-animation-delay: 0;
        animation-delay: 0;
        -webkit-animation-duration: 2s;
        animation-duration: 2s;
        -webkit-animation-timing-function: ease-in-out;
        animation-timing-function: ease-in-out;
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
    }

    .ball-triangle-path > div {
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 100%;
        border: 1px solid #279fcf;
    }

    .ball-triangle-path > div.div-1 {
        top: 50px;
    }

    .ball-triangle-path > div.div-2 {
        left: 25px;
    }

    .ball-triangle-path > div.div-3 {
        top: 50px;
        left: 50px;
    }
</style>
