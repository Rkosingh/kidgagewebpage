import React, { useState } from 'react';
import Sidebar from './sidebar'; // Import the Sidebar component
import './dashboard.css'; // Ensure you have the necessary styles
import AddCourseForm from './AddCourseForm';
import EditCourseForm from './EditCourseForm';
import CourseEnrollment from './CourseEnrollment';
import AddAcademyForm from './AddAcademyForm';
import AddParentForm from './AddParentForm';
import AddStudentForm from './AddStudentForm';
import AddBannerForm from './AddBannerForm';
import EditBannerForm from './EditBannerForm';
import AddPosterForm from './AddPosterForm';
import EditPosterForm from './EditPosterForm';
import AddCourseCategoryForm from './AddCourseCategory';
import EditCourseCategoryForm from './EditCourseCategoryForm';
import EditParentForm from './EditParentForm';
const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    

    return (
        <div className="dashboard-body">
            <div className="hamburger-menu" onClick={toggleSidebar}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className={`dashboard-card ${sidebarOpen ? 'expanded' : ''}`}>
                <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} /> {/* Render the Sidebar component */}
                <div className={`dashboard-content ${sidebarOpen ? 'expanded' : ''}`}>
                    <section id="courses" className="db-section">
                        <h1>Courses</h1>
                        <CourseEnrollment />
                        <AddCourseForm />
                        <EditCourseForm />
                    </section>
                    <section id="academies" className="db-section">
                        <h1>Academies</h1>
                        <AddAcademyForm />
                    </section>
                    <section id="parents" className="db-section">
                        <h1>Parents</h1>
                        <AddParentForm />
                        <EditParentForm/>
                    </section>
                    <section id="students" className="db-section">
                        <h1>Students</h1>
                        <AddStudentForm />
                    </section>
                    <section id="add-banners" className="db-section">
                        <h1>Add Banners</h1>
                        <AddBannerForm />
                        <EditBannerForm />
                    </section>
                    <section id="posters" className="db-section">
                        <h1>Posters</h1>
                        <AddPosterForm />
                        <EditPosterForm />
                    </section>
                    <section id="course-categories" className="db-section">
                        <h1>Course Categories</h1>
                        <AddCourseCategoryForm />
                        <EditCourseCategoryForm />
                    </section>
                    <section id="signout" className="db-section">
                        <h1>Sign Out</h1>
                        <p>Content for the Sign Out section.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
