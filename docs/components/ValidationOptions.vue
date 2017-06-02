<template>
    <div>
        <a @click="showOptions = !showOptions">
            {{ showOptions ? 'Hide Validation Options' : 'Show Validation Options' }}
        </a>
        <fieldset class="form-options" v-if="showOptions">
            <div class="columns">
                <div class="column is-6">
                    <h4>Validation Triggers</h4>
                    <div class="form-group">
                        <label for="validateOnInput">
                            <input type="checkbox" id="validateOnInput" v-model="form._config.validateOnInput"
                                   class="form-control">
                            Input Events
                        </label>
                    </div>
                    <div class="form-group">
                        <label for="validateOnFocus">
                            <input type="checkbox" id="validateOnFocus" v-model="form._config.validateOnFocus"
                                   class="form-control">
                            Focus Events
                        </label>
                    </div>
                    <div class="form-group">
                        <label for="validateOnBlur">
                            <input type="checkbox" id="validateOnBlur" v-model="form._config.validateOnBlur"
                                   class="form-control">
                            Blur Events
                        </label>
                    </div>
                    <div class="form-group">
                        <label for="validateOnSubmit">
                            <input type="checkbox" id="validateOnSubmit" v-model="form._config.validateOnSubmit"
                                   class="form-control">
                            Submit Events
                        </label>
                    </div>

                    <div class="form-group">
                        <label for="inputDebounce">Input Validation Debounce</label>
                        <input type="number" id="inputDebounce" step="10" max="5000" min="0"
                               v-model="form._config.inputDebounce" class="form-control inline-control"> ms
                    </div>
                </div>

                <div class="column is-6">
                    <h4>Touch Triggers</h4>
                    <div class="form-group">
                        <label for="touchOnInput">
                            <input type="checkbox" id="touchOnInput" checked="checked" disabled="disabled"
                                   class="form-control">
                            Input Events
                        </label>
                    </div>
                    <div class="form-group">
                        <label for="touchOnFocus">
                            <input type="checkbox" id="touchOnFocus" v-model="form._config.touchOnFocus"
                                   class="form-control">
                            Focus Events
                        </label>
                    </div>
                    <div class="form-group">
                        <label for="touchOnBlur">
                            <input type="checkbox" id="touchOnBlur" v-model="form._config.touchOnBlur"
                                   class="form-control">
                            Blur Events
                        </label>
                    </div>

                    Note about Touch:
                    <br/>
                    <small>
                        Validation can only occur on fields marked as dirty
                        (fields that were <em>touched</em> by the user).
                        Configure these options for your ideal user experience.
                    </small>
                </div>
            </div>
        </fieldset>
    </div>
</template>

<script>
    export default {
        props: ['form'],
        data: () => ({
            showOptions: false,
        })
    }
</script>