import { useSelector } from "react-redux";
import "../styles/About.css";
import Menu1 from './Menu1.jsx';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



export default function About() {
    const user = useSelector(state => state.user.loggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate("/");
    }, [user])
    return <><Menu1 /><div className="about-container">
        <div className="about-container-1">
            <div className="about-item">
                <div className="about-layer">
                    <h3>Title</h3>
                    <div className="p">Welcome to our website! We are dedicated to providing valuable information, resources, and services to our community.</div>
                    <span className="about-span">Allah is great</span>
                </div>
                <h4>Step 01</h4>
            </div>

            <div className="about-item">
                <div className="about-layer">
                    <h3>another title</h3>
                    <div className="p">
                        Rahima Hullah
                    </div>
                    <span className="about-span">five times a prayer</span>
                </div>
                <h4>Step 02</h4>
            </div>

            <div className="about-item">
                <div className="about-layer">
                    <h3>super another title</h3>
                    <div className="p">
                        the mosque is the biggest in this country
                    </div>
                    <span className="about-span">zooma prayer on friday</span>
                </div>
                <h4>Step 03</h4>
            </div>
        </div>
        <div className="fade-in">
            <h1>About MoneyMate</h1>
            <div>The "MoneyMate" web application aspires to be a user's indispensable financial companion, aimed at alleviating the everyday financial challenges faced by students, business professionals, employees, and employers alike. Our primary objective is to provide a solution for efficient money budgeting and expense management.</div>
            <h2>Key Features of "MoneyMate" include:</h2>
            
            <div>In summary, our project's primary aim is to address the pressing demand for effective financial management tools. We seek to achieve this by developing an application that boasts both ease of use and a rich array of features. This introduction offers a comprehensive overview of our project's purpose, scope, research methods, main arguments, and anticipated outcomes. Our ultimate aspiration is to empower users to gain better control over their finances, make informed financial decisions, and ultimately attain their financial aspirations.</div>
        </div>
        <div className="about-circle-container">
            <div className="about-card">The application will offer a user interface that is intuitive, user-friendly, and easily navigable.</div>
            <div className="about-card">Users will be able to categorize their sources of income and various types of expenses, facilitating precise financial tracking.</div>
            <div className="about-card">Budget Creation and Monitoring: "MoneyMate" will enable users to establish personalized budgets for distinct expenditure categories. Real-time monitoring and alerts for budget adherence will be provided.</div>
            <div className="about-card">Expense Analytics with Visualizations: The application will generate visual representations such as charts and graphs to illustrate spending patterns over time, enhancing data-driven decision-making.</div>
            <div className="about-card">Recurring Expense Tracking: Users can effortlessly manage recurring expenses, ensuring automatic inclusion in their budgets, and monitoring compliance with budget limits.</div>
            <div className="about-card">Setting Financial Goals: "MoneyMate" will support users in defining and pursuing financial objectives, whether it be savings targets or debt reduction, providing personalized guidance.</div>
            <div className="about-card">Ensuring Data Security: Stringent data security measures, including encryption and access controls, will be implemented to safeguard sensitive user information.</div>
            <div className="about-card">Syncing Data Across Devices: The application will facilitate seamless data synchronization across multiple devices, ensuring accessibility anytime, anywhere.</div>
        </div>
        {/* <h1>About Us</h1>
        <p>Welcome to our website! We are dedicated to providing valuable information, resources, and services to our community.</p>
        
        <div className="mission-statement">
            <h2>Our Mission</h2>
            <p>Our mission is to empower individuals and businesses by offering high-quality content, innovative solutions, and exceptional support.</p>
        </div>

        <div className="team">
            <h2>Our Team</h2>
            <p>We are a diverse team of professionals passionate about our work and committed to making a positive impact. Meet the faces behind our organization:</p>
            <ul>
                <li>John Doe - CEO</li>
                <li>Jane Smith - Marketing Director</li>
                <li>Michael Johnson - Head of Development</li>
            </ul>
        </div>

        <div className="contact-info">
            <h2>Contact Us</h2>
            <p>If you have any questions, suggestions, or feedback, please don't hesitate to reach out to us:</p>
            <ul>
                <li>Email: info@example.com</li>
                <li>Phone: 123-456-7890</li>
                <li>Address: 123 Main Street, City, Country</li>
            </ul>
        </div> */}
    </div></>
}