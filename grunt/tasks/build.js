module.exports = function (grunt) {
    grunt.registerTask('build:staging', [
        'clean:dist',
        'copy:dist',
        'compress:gzip',
        'aws_s3:staging'
    ]);

    grunt.registerTask('build:production', [
        'clean:dist',
        'copy:dist',
        'compress:gzip',
        'aws_s3:production'
    ]);
};
