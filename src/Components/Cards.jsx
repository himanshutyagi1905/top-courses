import Card from "./Card";
import React, { useState } from 'react'

const Cards = (props) => {
    // console.log('kkkkkkkkkkkkkkkk', props.category)
    console.log(props.category);
    console.log(props.courses);

    let category = props.category;
    const [likedCourses, setLikedCourses] = useState([]);

    function getCourses() {
        // console.log('kkkkkkkkkkkkkkkk', category)
        if (category === "All") {
            let allCourses = [];
            Object.values(props.courses).forEach((array) => {
                array.forEach((courseData) => {
                    allCourses.push(courseData);
                    // console.log('vvvvvvvvvvvvvvvvvvvvvvv', courseData)
                });
            });
            return allCourses;
        }
        else
        {
            return props.courses[category];
        }
    }

    //   console.log(allCourse);
    return (
        <div className="flex flex-wrap justify-center gap-4 mb-4">
             {
                getCourses() && getCourses().map((course) => {
                    return <Card course={course} key={props.courses.id} likedCourses={likedCourses} setLikedCourses={setLikedCourses} />;
                })
            }
        </div>
    );
};

export default Cards;
