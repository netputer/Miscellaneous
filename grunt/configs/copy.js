module.exports = function (grunt) {
    grunt.config.set('copy', {
        dist: {
            files: [{
                expand: true,
                dot: true,
                cwd: '<%= paths.app %>',
                dest: '<%= paths.dist %>',
                src: [
                    '**/*.js',
                    '**/*.png'
                ]
            }]
        }
    });
};
