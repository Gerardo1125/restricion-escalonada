/**
 * JavaScript for form editing grade conditions.
 *
 * @module moodle-availability_newgrade-form
 */
M.availability_newgrade = M.availability_newgrade || {};

/**
 * @class M.availability_newgrade.form
 * @extends M.core_availability.plugin
 */

M.availability_newgrade.form = Y.Object(M.core_availability.plugin);

/**
 * Grade items available for selection.
 *
 * @property grades
 * @type Array
 */

M.availability_newgrade.form.grades = null;

/**
 * Initialises this plugin.
 *
 * @method initInner
 * @param {Array} grades Array of objects containing gradeid => name
 */

M.availability_newgrade.form.initInner = function (grades) {
    this.grades = grades;
    this.nodesSoFar = 0;
    // console.log('The param was: ' + param);
};

M.availability_newgrade.form.getNode = function (json) {
    // This function does the main work. It gets called after the user
    // chooses to add an availability restriction of this type. You have
    // to return a YUI node representing the HTML for the plugin controls.
    this.nodesSoFar++;
    // Example controls contain only one tickbox.
    var strings = M.str.availability_newgrade;
    var html = '<label class="form-group"><span class="pr-3">' + M.util.get_string('title', 'availability_newgrade') + '</span> ' +
        '<span class="availability-group">' +
        '<select name="id" class="custom-select"><option value="0">' + M.util.get_string('choosedots', 'moodle') + '</option>';
    for (var i = 0; i < this.grades.length; i++) {
        var grade = this.grades[i];
        // String has already been escaped using format_string.
        html += '<option value="' + grade.id + '">' + grade.name + '</option>';
    }
    html += '</select></span></label> <br><span class="availability-group form-group">' +
        '<label><input type="checkbox" class="form-check-input mx-1" name="min"/>' +
        M.util.get_string('option_min', 'availability_newgrade') +
        '</label> <label><span class="accesshide">' + M.util.get_string('label_min', 'availability_newgrade') +
        '</span><input type="text" class="form-control mx-1" name="minval" title="' +
        M.util.get_string('label_min', 'availability_newgrade') + '"/></label>%</span><br>' +
        '<span class="availability-group form-group">' +
        '<label><input type="checkbox" class="form-check-input mx-1" name="max"/>' +
        M.util.get_string('option_max', 'availability_newgrade') +
        '</label> <label><span class="accesshide">' + M.util.get_string('label_max', 'availability_newgrade') +
        '</span><input type="text" class="form-control mx-1" name="maxval" title="' +
        M.util.get_string('label_max', 'availability_newgrade') + '"/></label>%</span>';

    var node = Y.Node.create('<div class="d-inline-block form-inline">' + html + '</div>');

    // Set initial values.
    if (json.id !== undefined &&
        node.one('select[name=id] > option[value=' + json.id + ']')) {
        node.one('select[name=id]').set('value', '' + json.id);
    }
    if (json.min !== undefined) {
        node.one('input[name=min]').set('checked', true);
        node.one('input[name=minval]').set('value', json.min);
    }
    if (json.max !== undefined) {
        node.one('input[name=max]').set('checked', true);
        node.one('input[name=maxval]').set('value', json.max);
    }

    // Disables/enables text input fields depending on checkbox.
    var updateCheckbox = function (check, focus) {
        var input = check.ancestor('label').next('label').one('input');
        var checked = check.get('checked');
        input.set('disabled', !checked);
        if (focus && checked) {
            input.focus();
        }
        return checked;
    };
    node.all('input[type=checkbox]').each(updateCheckbox);

    // Add event handlers (first time only). You can do this any way you
    // like, but this pattern is used by the existing code.
    if (!M.availability_newgrade.form.addedEvents) {
        M.availability_newgrade.form.addedEvents = true;

        var root = Y.one('.availability-field');
        root.delegate('change', function () {
            // For the newgrade item, just update the form fields.
            M.core_availability.form.update();
        }, '.availability_newgrade select[name=id]');

        root.delegate('click', function () {
            updateCheckbox(this, true);
            M.core_availability.form.update();
        }, '.availability_newgrade input[type=checkbox]');

        root.delegate('valuechange', function () {
            // For newgrade values, just update the form fields.
            M.core_availability.form.update();
        }, '.availability_newgrade input[type=text]');
    }

    return node;
};

M.availability_newgrade.form.fillValue = function (value, node) {
    value.id = parseInt(node.one('select[name=id]').get('value'), 10);

    if (node.one('input[name=min]').get('checked')) {
        value.min = this.getValue('minval', node);
    }
    if (node.one('input[name=max]').get('checked')) {
        value.max = this.getValue('maxval', node);
    }
};

M.availability_newgrade.form.getValue = function (field, node) {
    // Get field value.
    var value = node.one('input[name=' + field + ']').get('value');

    // If it is not a valid positive number, return false.
    if (!(/^[0-9]+([.,][0-9]+)?$/.test(value))) {
        return value;
    }

    // Replace comma with dot and parse as floating-point.
    var result = parseFloat(value.replace(',', '.'));
    if (result < 0 || result > 100) {
        return value;
    } else {
        return result;
    }
};

M.availability_newgrade.form.fillErrors = function (errors, node) {
    var value = {};
    this.fillValue(value, node);

    if (value.id === 0) {
        errors.push('availability_newgrade:error_selectgradeid');
    }

    // Check numeric values.
    if ((value.min !== undefined && typeof (value.min) === 'string') ||
        (value.max !== undefined && typeof (value.max) === 'string')) {
        errors.push('availability_newgrade:error_invalidnumber');
    } else if (value.min !== undefined && value.max !== undefined &&
        value.min >= value.max) {
        errors.push('availability_newgrade:error_backwardrange');
    }
};