<template>
    <div class="api-reports" v-if="apiBusy || apiError">
        <div class="api-error" v-if="apiError">
            <h2>API Error</h2>
            <p>
                <strong>{{ apiError.status }} {{ apiError.message }}</strong>
            </p>
            <div class="has-text-centered">
                <button type="button" class="button" @click="clearAPI()">Okay</button>
            </div>
        </div>
        <div class="api-status" v-if="apiBusy">
            <strong>API working...</strong>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex"
    import {SET_API_IDLE, SET_API_ERROR} from "../store/types"
    export default {
        name: 'ApiReporter',
        computed: mapGetters(['apiBusy', 'apiError']),
        methods: {
            clearAPI() {
                this.$store.commit(SET_API_IDLE)
                this.$store.commit(SET_API_ERROR)
            }
        }
    }
</script>