const express = require('express');

const app = express();
app.use(express.json())
app.listen(3333);

let courses = [];
let globalId = 0;

app.get('/courses', (request, response) => {
    if (request.query.id) {
        const course = courses.find(c => c.id == request.query.id);
        return response.json(course);
    }
    return response.json(courses);
});

app.post('/courses', (request, response) => {
    globalId += 1;
    courses.push({ id: globalId, ...request.body});
    return response.json(courses);
});

app.put('/courses/:id', (request, response) => {
    courses.map((course, index, _) => {
        if (course.id == request.params.id) {
            courses[index] = { id: course.id, ...request.body };
        }
    });
    return response.json(courses);
});

app.delete('/courses/:id', (request, response) => {
    courses = courses.filter(course => course.id != request.params.id);
    return response.json(courses);
});
