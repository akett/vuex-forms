<template>
    <div>
        <div class="code-example">
            <ul class="example-tabs">
                <li :class="{'active-tab': tab === 'html'}" @click="tab = 'html'">HTML</li>
                <li :class="{'active-tab': tab === 'javascript'}" @click="tab = 'javascript'">Javascript</li>
                <li :class="{'active-tab': tab === 'result'}" @click="tab = 'result'">Result</li>
            </ul>
            <div class="example-display" v-show="tab === 'html'">
                <slot name="html"></slot>
            </div>
            <div class="example-display" v-show="tab === 'javascript'">
                <slot name="javascript"></slot>
            </div>
            <div class="example-display" v-show="tab === 'result'">
                <slot name="result"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DocExample',
        data: () => ({
            tab: 'result',
        })
    }
</script>