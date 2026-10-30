
document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       SELECTORS
    ===================================================== */

    const loader = document.getElementById("loader");
    const navbar = document.getElementById("navbar");

    // Your HTML uses menuButton, not menuBtn
    const menuBtn =
        document.getElementById("menuButton");

    const navMenu =
        document.getElementById("navMenu");

    const changingRole =
        document.getElementById("changingRole");


    /* =====================================================
       PAGE LOADER
    ===================================================== */

    window.addEventListener("load", () => {
        setTimeout(() => {
            if (loader) {
                loader.classList.add("hide");
            }
        }, 500);
    });


    /* =====================================================
       NAVBAR SCROLL
    ===================================================== */

    function updateNavbar() {
        if (!navbar) return;

        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 30
        );
    }

    updateNavbar();

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", () => {

            const isOpen =
                navMenu.classList.toggle("open");

            menuBtn.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });

        navMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("open");

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });
    }


    /* =====================================================
       CHANGING HERO ROLE
    ===================================================== */

    if (changingRole) {

        const roles = [
            "Aspiring Data Analyst",
            "Data Visualization Learner",
            "Analytics Project Builder",
            "Analytics Web Developer",
            "AI-Assisted Web Developer"
        ];

        let roleIndex = 0;

        setInterval(() => {

            changingRole.style.opacity = "0";

            setTimeout(() => {

                roleIndex =
                    (roleIndex + 1) % roles.length;

                changingRole.textContent =
                    roles[roleIndex];

                changingRole.style.opacity = "1";

            }, 400);

        }, 2500);
    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(entry.target);
                        }
                    });

                },
                { threshold: 0.12 }
            );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll("main section[id]");

    const navLinks =
        document.querySelectorAll("#navMenu a");

    if (
        "IntersectionObserver" in window &&
        sections.length > 0
    ) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        navLinks.forEach(link => {

                            link.classList.toggle(
                                "active",
                                link.getAttribute("href") ===
                                `#${entry.target.id}`
                            );

                        });

                    });

                },
                {
                    rootMargin: "-35% 0px -55% 0px"
                }
            );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }


    /* =====================================================
       CERTIFICATE VIEWER
       Image + Description + Full-size link
    ===================================================== */

    const certificateModal =
        document.getElementById("certificateModal");

    const modalImage =
        document.getElementById("modalImage");

    const modalOpen =
        document.getElementById("modalOpen");

    const modalClose =
        document.getElementById("modalClose");

    const modalBackdrop =
        document.querySelector(
            "#certificateModal .modal-backdrop"
        );

    const certificateButtons =
        document.querySelectorAll(
            ".certificate-card [data-certificate]"
        );


    // Create the description panel inside the existing modal.
    // No second modal is needed.
    let descriptionPanel = null;
    let descriptionTitle = null;
    let descriptionText = null;
    let descriptionCategory = null;
    let descriptionIssuer = null;
    let descriptionDate = null;
    let descriptionGithub = null;

    if (certificateModal) {

        descriptionPanel =
            document.createElement("section");

        descriptionPanel.className =
            "certificate-description";

        descriptionPanel.innerHTML = `
            <div class="certificate-description-header">
                <span class="description-label">
                    CERTIFICATE DETAILS
                </span>
                <h2 class="description-title">
                    Certificate
                </h2>
            </div>

            <p class="description-category"></p>

            <div class="description-meta">
                <p>
                    <strong>Issued by:</strong>
                    <span class="description-issuer"></span>
                </p>

                <p>
                    <strong>Date:</strong>
                    <span class="description-date"></span>
                </p>
            </div>

            <div class="description-body"></div>

            <a
                class="description-github"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                hidden
            >
                VIEW RELATED GITHUB PROJECT ↗
            </a>
        `;

        // Add the panel after the modal image.
        if (modalImage) {
            modalImage.insertAdjacentElement(
                "afterend",
                descriptionPanel
            );
        } else {
            certificateModal
                .querySelector(".modal-content")
                ?.appendChild(descriptionPanel);
        }

        descriptionTitle =
            descriptionPanel.querySelector(
                ".description-title"
            );

        descriptionCategory =
            descriptionPanel.querySelector(
                ".description-category"
            );

        descriptionIssuer =
            descriptionPanel.querySelector(
                ".description-issuer"
            );

        descriptionDate =
            descriptionPanel.querySelector(
                ".description-date"
            );

        descriptionText =
            descriptionPanel.querySelector(
                ".description-body"
            );

        descriptionGithub =
            descriptionPanel.querySelector(
                ".description-github"
            );
    }


    /*
       Add descriptions and optional GitHub links
       to individual certificate cards.

       Edit these details to suit your actual certificates.
       Do not add a GitHub link unless it is relevant.
    */

    const certificateDetails = {
        


"Introduction_to_SQL.jpg": {
    category: "Databases · SQL",
    issuer: "Simplilearn SkillUp",
    date: "31 August 2026",
    description: `
        Completed the Introduction to SQL course.
        This certificate documents my learning in SQL,
        a core tool for working with relational databases
        and querying structured data.

-Course Overview
Introduction to SQL is a beginner-level online course offered by Simplilearn SkillUp that introduces the fundamentals of Structured Query Language (SQL) and relational database management. The course focuses on understanding how databases store information and how SQL can be used to retrieve, organize, filter, summarize, and manage data.

SQL is an essential skill in data analytics because much of an organization's information is stored in relational databases. Data analysts use SQL to extract relevant records, combine information from multiple tables, calculate summary statistics, investigate business performance, and prepare datasets for further analysis.

This course introduces practical database concepts through topics involving MySQL, PostgreSQL, and SQL Server. It also covers SQL functions, grouping, joins, subqueries, triggers, procedures, views, and SQL integration with Python. Additional topics listed in the course overview include relational database design, query optimization, database administration, data modeling, data analysis, and business intelligence.

The course is suitable for beginners who want to establish a foundation in database querying and develop skills relevant to data analytics, database management, software development, and business intelligence.

-Learning Objectives

The primary objective of this course is to develop an understanding of how SQL works and how it can be applied to retrieve and manipulate information stored in relational databases.

The key learning objectives include:
- Understanding the purpose of SQL and relational databases.
- Learning how database tables organize information into rows and columns.
- Understanding how SQL queries retrieve and filter records.
- Using built-in SQL functions to perform calculations and transform values.
- Grouping records and calculating aggregate results.
- Combining data from multiple tables using joins.
- Understanding subqueries and nested SQL statements.
- Exploring database triggers, procedures, and views.
- Learning about SQL integration with Python.
- Gaining introductory exposure to MySQL, PostgreSQL, and SQL Server.
- Understanding relational database design and data modeling.
- Developing awareness of query optimization and database administration.
- Preparing for further SQL practice and technical interviews.

-Course Curriculum

1. Introduction
The introductory lesson establishes the context for learning SQL and explains the importance of databases in modern applications and analytical workflows.
It provides a starting point for understanding how structured information is stored and why query languages are necessary for retrieving useful information from databases.

2. What Is SQL?
SQL stands for Structured Query Language. It is used to communicate with relational database management systems and perform operations on structured data.
SQL allows users to retrieve records, filter information, sort results, insert new data, update existing records, and manage database structures, depending on the permissions and operations supported by the database system.

Key concepts include:
- The purpose and applications of SQL.
- Relational databases and database tables.
- Rows, columns, and records.
- Basic query structure.
- Retrieving information from tables.
- Filtering and sorting query results.
- Understanding SQL's role in data analysis.
For a data analyst, these fundamentals provide the foundation for extracting relevant information from business databases.

3. MySQL Built-in Functions
SQL functions allow users to perform calculations and transform data directly within database queries.
This lesson introduces MySQL built-in functions, which can help process values and generate useful results without requiring every calculation to be performed outside the database.

Relevant concepts include:
- Numeric calculations.
- String manipulation.
- Date and time operations.
- Handling missing or null values.
- Applying functions to columns.
- Using functions in analytical queries.
Depending on the function and database system, these techniques can help standardize text, calculate values, format dates, and prepare information for reporting.

4. Groups in SQL
Grouping is an important technique for summarizing large datasets. SQL provides the  GROUP BY  clause to organize records into groups based on one or more columns.
Aggregate functions can then calculate summary values for each group.

Important concepts include:
- Grouping records using  GROUP BY .
- Calculating totals with SUM().
- Counting records with COUNT().
- Calculating averages with AVG().
- Identifying minimum and maximum values.
- Filtering grouped results with HAVING.
- Comparing results across categories.
For example, an analyst could group sales records by product category, calculate revenue for each category, and identify the categories contributing the most revenue.

5. Joins in SQL
Database information is often distributed across multiple related tables. SQL joins allow users to combine records from these tables using related columns.
Joins are particularly useful when customer details, order records, product information, and transaction data are maintained separately.

Key concepts include:
- Understanding relationships between tables.
- Joining tables using related keys.
- INNER JOIN for matching records.
- LEFT JOIN for retaining all records from the left table.
- RIGHT JOIN for retaining all records from the right table.
- Combining information for analysis.
- Understanding how unmatched records affect query results.
For example, an analyst could join customer and order tables to examine purchasing patterns or combine product and sales tables to calculate product-level performance.

6. What Is a Subquery?
A subquery is a query nested inside another SQL statement. It can provide intermediate results that the outer query uses to filter, compare, or retrieve information.
Subqueries help express more complex analytical requirements when one query depends on the result of another.

Key concepts include:
- Understanding nested queries.
- Using subqueries in filtering conditions.
- Comparing values with query results.
- Working with IN and EXISTS.
- Understanding scalar and multi-row subqueries.
- Using subqueries to solve multi-step data questions.
For example, a subquery can help identify products whose sales exceed the average sales value calculated from a larger dataset.

7. Triggers in SQL
A database trigger is a database object that executes automatically in response to a specified event, such as an insert, update, or delete operation, depending on the database system.
Triggers can be used to enforce certain rules, maintain audit records, or automate specific database actions.

Key concepts include:
- The purpose of database triggers.
- Events that can activate a trigger.
- Trigger-based automation.
- Data integrity and validation.
- Auditing database changes.
- Understanding when trigger-based logic is appropriate.
Triggers are more closely associated with database programming and management than everyday analytical querying, but understanding them provides broader knowledge of how databases operate.

8. Procedures and Views in SQL
Stored procedures and views help organize database logic and make information easier to access.
A stored procedure is a reusable set of database instructions that can be executed when needed. A view is a virtual table defined by a query, which can simplify access to selected or combined information.

Key concepts include:
- Understanding stored procedures.
- Organizing reusable database operations.
- Understanding parameters and procedural logic.
- Creating and using database views.
- Simplifying complex queries.
- Presenting selected information through views.
- Supporting maintainability and controlled data access.
For example, a view could present selected customer and sales information in a simplified structure for reporting, while a stored procedure could perform a predefined database operation.

9. SQL with Python
Python and SQL can work together in data-analysis workflows. SQL retrieves and processes data within a database, while Python can support further analysis, automation, statistical calculations, and visualization.

This lesson introduces SQL integration with Python as a topic within the course curriculum.
Potential applications include:
- Retrieving database records for analysis.
- Connecting Python applications to supported databases.
- Executing SQL queries through Python database tools.
- Loading query results into data-analysis workflows.
- Combining SQL data retrieval with Python processing.
- Preparing database results for further analysis.
These techniques are useful when building repeatable analytical workflows. The specific Python libraries and exercises covered should be confirmed from the lesson materials before listing them as completed practical work.

10. PostgreSQL
PostgreSQL is an open-source relational database management system used to store, organize, and query structured data.
This lesson introduces PostgreSQL as part of the broader SQL learning experience.

Important concepts include:
- Understanding PostgreSQL as a relational database system.
- Writing and executing SQL queries.
- Retrieving and filtering records.
- Working with tables and relationships.
- Applying SQL concepts in a PostgreSQL environment.
- Recognizing that SQL syntax and features can differ between database systems.

Learning PostgreSQL is useful for analysts who work with structured datasets and database-driven applications.

11. How to Become an SQL Developer?
This lesson introduces the SQL developer career path and provides context for understanding how SQL skills are used in professional environments.
SQL developers commonly work with database queries, data structures, stored procedures, performance improvements, and database-related application requirements.

Related areas of knowledge include:
- SQL programming fundamentals.
- Relational database concepts.
- Query development and troubleshooting.
- Database objects and data structures.
- Data modeling and database design.
- Query performance and optimization.
- Continued learning through practical projects.
For aspiring data analysts, this career-oriented topic helps explain how SQL skills connect to broader database and data-related roles.

12. SQL Interview Questions
The final lesson focuses on SQL interview questions, providing a starting point for reviewing fundamental SQL concepts and preparing for technical discussions.
SQL interviews commonly assess the ability to retrieve, filter, aggregate, and combine data, as well as explain query logic and solve practical data problems.

Useful areas for revision include:
- Basic SQL queries.
- Filtering and sorting records.
- Aggregate functions and grouping.
- Joins and subqueries.
- Database relationships.
- Functions, views, and stored procedures.
- Query troubleshooting.
- Database concepts and analytical problem-solving.
Interview preparation is most effective when combined with hands-on practice using sample databases and realistic business questions.

-Skills and Knowledge Areas
The course overview lists the following skills and related areas:
- SQL
- MySQL
- PostgreSQL
- SQL Server
- Relational Database Design
- Data Analysis
- Query Optimization
- Database Administration
- Data Modeling
- Business Intelligence
The curriculum also introduces specific SQL concepts, including joins, grouping, built-in functions, subqueries, triggers, procedures, and views.
Together, these topics provide a foundation for querying relational databases and understanding how database systems support analytical and business operations.

-Understanding the SQL Data-Analysis Workflow

The following workflow illustrates how SQL can be applied to a typical data-analysis task.

**Step 1 — Understand the data:** Identify the database tables, columns, data types, and relationships relevant to the business question.

**Step 2 — Retrieve records:** Use  SELECT  to choose the required columns and  FROM  to identify the source table.

**Step 3 — Filter information:** Apply  WHERE  conditions to select records that meet specific requirements.

**Step 4 — Combine related data:** Use joins to bring together information from multiple tables.

**Step 5 — Summarize results:** Apply aggregate functions and  GROUP BY  to calculate totals, counts, and averages.

**Step 6 — Apply advanced logic:** Use subqueries or other appropriate SQL features when the analysis requires more complex conditions.

**Step 7 — Interpret the results:** Examine the query output to identify trends, compare categories, and answer the original business question.

**Step 8 — Prepare data for further analysis:** Use the results in spreadsheets, Python, or business intelligence tools when additional analysis or visualization is needed.

This workflow demonstrates why SQL is an important part of the data analyst toolkit.

-Practical Applications

SQL knowledge can be applied to a wide range of professional tasks.

**Business Analytics:** Query sales, revenue, customer, and operational databases to understand performance.

**Customer Analysis:** Combine customer and transaction tables to examine purchasing behaviour and customer activity.

**Financial Analysis:** Retrieve financial records, calculate summaries, and compare values across reporting periods.

**Inventory Analysis:** Examine product availability, stock movements, and transaction records.

**Data Preparation:** Extract and filter relevant records before using Python, Excel, Power BI, or Tableau.

**Database Management:** Understand database structures and the purpose of objects such as views, triggers, and stored procedures.

These are examples of potential applications of the course concepts, not claims that each task was completed during the training.

SQL is widely used in data-focused roles because it enables professionals to retrieve and summarize information stored in relational databases. Further practice with real datasets, database projects, query optimization, and analytical tools can help strengthen these skills.

-Conclusion
Introduction to SQL provides a foundation in relational databases and the SQL techniques used to retrieve, organize, combine, and summarize structured information. Its curriculum covers fundamental queries, functions, grouping, joins, subqueries, database objects, SQL with Python, PostgreSQL, and interview preparation.

These concepts are relevant to data analytics, reporting, database management, and business intelligence. By combining the knowledge gained from the course with practical SQL exercises and portfolio projects, learners can continue developing the ability to work with structured data and answer meaningful analytical questions.
 `,
    github: ""
},

"Python_for_Data_Analysis.jpg": {
    category: "Python · Data Analytics · Python libraries ",
    issuer: "Simplilearn SkillUp",
    date: "21 October 2026",
    description: `
        Completed the Python for Data Analysis course.
        This learning supports my development in using
        Python for data-focused tasks and analytical work.

-Course Overview

Python for Data Analysis is a beginner-level online course offered by Simplilearn SkillUp that introduces the practical application of Python programming in data analytics. The course focuses on transforming raw datasets into meaningful insights through data cleaning, numerical computation, exploratory data analysis, descriptive statistics, and data visualization.

Python is widely used in data analytics because it provides libraries and tools that simplify data processing and analysis. This course introduces two important Python libraries, NumPy and Pandas, which help analysts work with numerical data, organize datasets, perform calculations, and identify patterns. It also introduces financial analysis using Python, demonstrating how programming can support the examination of financial information.

The course is designed for learners who want to build foundational Python data-analysis skills and understand how analytical techniques can support evidence-based decision-making. Its practical orientation connects programming concepts with common tasks performed by data analysts, research analysts, business analysts, operations analysts, and other professionals who work with data.

-Learning Objectives
The course introduces the fundamentals of data analytics and demonstrates how Python can be used throughout the data-analysis process.
The key learning objectives include:
- Understanding the role of data analytics in extracting insights from raw data.
- Learning how Python supports data processing and analytical workflows.
- Understanding numerical computation using NumPy.
- Working with structured datasets using Pandas.
- Exploring data-cleaning techniques and file handling.
- Performing exploratory data analysis to identify patterns and trends.
- Understanding descriptive statistics and basic time-series concepts.
- Creating data visualizations to communicate analytical findings.
- Exploring financial analysis using Python.

-Course Curriculum

1. Introduction

The introductory lesson provides an entry point to the course and establishes the context for learning Python for data analysis.

It introduces the purpose of the course and prepares learners to explore Python-based analytical techniques. This foundation helps connect programming with the broader objective of converting raw data into useful information.

2. What Is Data Analytics?

This lesson introduces the concept of data analytics and its role in understanding information, identifying patterns, and supporting decision-making.

Data analytics involves examining data to discover meaningful relationships, trends, and insights. It can be applied to business performance, financial records, operational activities, scientific research, and many other areas.

The course overview highlights practical analytical activities such as cleaning messy datasets, identifying patterns, and presenting findings through visualizations.

Key concepts include:
- Fundamentals of data analytics.
- The role of data in decision-making.
- Data cleaning and preparation.
- Exploratory data analysis.
- Pattern identification and interpretation.
- Data visualization and communicating insights.

3. NumPy in Data Analytics

NumPy is a fundamental Python library for numerical computing. It provides efficient multidimensional arrays and mathematical operations that are useful when working with numerical datasets.

This lesson introduces the role of NumPy in analytical workflows, particularly when performing calculations on numerical data.

Potential applications include calculating averages, examining numerical distributions, performing mathematical operations, and preparing numerical information for further analysis.

Key concepts include:
- NumPy arrays and numerical data.
- Array-based calculations.
- Mathematical and statistical operations.
- Efficient numerical processing.
- Working with structured numerical information.
- Preparing data for analytical tasks.
NumPy provides a foundation for numerical analysis and complements other Python libraries used for data manipulation and visualization.

4. Pandas in Data Analytics

Pandas is a Python library designed for working with structured and tabular data. It provides tools for loading, organizing, cleaning, transforming, and summarizing datasets.

This lesson introduces the role of Pandas in practical data-analysis workflows. The course overview identifies data cleaning, exploratory analysis, and working with actual datasets as important learning themes.

Key concepts include:
- Working with Pandas Series and DataFrames.
- Loading and handling data files.
- Inspecting dataset structure and data types.
- Identifying missing or inconsistent values.
- Cleaning and preparing datasets.
- Filtering and selecting records.
- Summarizing data and calculating descriptive statistics.
- Exploring patterns and relationships in datasets.
- Preparing data for visualization and reporting.
These skills are important because real-world datasets often require preparation before reliable conclusions can be drawn. Pandas helps organize this process into repeatable analytical steps.

5. Financial Analysis Using Python

This lesson introduces the application of Python to financial analysis. Financial data can include revenues, expenses, transaction records, prices, and other numerical information used to understand financial performance.

Python can help automate calculations, summarize financial datasets, examine changes over time, and present results in a structured format.

The course curriculum identifies financial analysis as a dedicated lesson, while the course overview also lists descriptive statistics and time-series fundamentals among the associated skills.

Relevant analytical applications include:
- Organizing financial datasets.
- Performing numerical calculations.
- Summarizing financial information.
- Calculating descriptive statistics.
- Examining changes and patterns over time.
- Preparing financial data for visualization.
- Supporting data-driven financial interpretation.
These techniques can be useful when analyzing financial transactions, business expenses, revenue trends, and other financial indicators. The specific financial exercises completed should be described separately if they are part of an actual practical assignment.

-Skills and Knowledge Areas
The course lists the following skills and related learning areas:
- Python for Data Analysis
- NumPy
- Pandas
- Data Visualization
- Data Cleaning Techniques
- File Handling
- Exploratory Data Analysis (EDA)
- Descriptive Statistics
- Time-Series Fundamentals
- Financial Analysis
Together, these topics provide a foundation for using Python to prepare datasets, perform calculations, explore information, and communicate analytical findings.

-Understanding the Python Data-Analysis Workflow
The concepts covered in the course fit into a typical data-analysis workflow.
**Step 1 — Data Collection:** Obtain data from relevant files or other available sources.

**Step 2 — Data Inspection:** Examine the dataset's structure, columns, data types, and completeness.

**Step 3 — Data Cleaning:** Identify and address missing values, inconsistent formats, duplicate records, and other data-quality issues where appropriate.

**Step 4 — Data Processing:** Use Pandas to organize and transform tabular data and NumPy to perform numerical calculations.

**Step 5 — Exploratory Data Analysis:** Apply summaries, descriptive statistics, and comparisons to understand distributions, patterns, and potential relationships.

**Step 6 — Data Visualization:** Present important patterns through appropriate charts and visual representations.

**Step 7 — Interpretation:** Explain what the results indicate and identify findings that may support further investigation or decision-making.
This workflow illustrates how Python libraries can work together to support a structured and repeatable analytical process.

-Practical Applications
Python data-analysis techniques can be applied in several professional contexts.
- **Business Analytics:** Examine sales, revenue, expenses, and business performance.
- **Financial Analysis:** Summarize financial records and explore numerical trends.
- **Operations Analytics:** Analyze operational measurements and identify patterns that may affect efficiency.
- **Research Analytics:** Organize experimental or observational data and calculate descriptive statistics.
- **Data Preparation:** Clean and transform datasets before further analysis.
- **Reporting and Visualization:** Present analytical findings in charts and summaries that are easier to interpret.
These are examples of how the course's subject areas can be applied. They should not be interpreted as evidence that every application was completed as a practical project during the course.

-Career Relevance
The course is relevant to learners developing foundational skills for data-focused roles, including:
- Junior Data Analyst
- Entry-Level Data Analyst
- Business Analyst
- Operations Analyst
- Research Analyst
- Financial Data Analyst
Python, NumPy, and Pandas are useful skills for these career paths. However, this introductory course alone does not establish professional proficiency or job readiness. Further practice with real datasets, SQL, spreadsheets, visualization tools, and portfolio projects can help strengthen these skills.

-Conclusion
Python for Data Analysis introduces the use of Python programming and its core analytical libraries to work with numerical and structured datasets. Through an introduction to data analytics, NumPy, Pandas, and financial analysis, the course provides a foundation for data cleaning, exploratory analysis, descriptive statistics, and data visualization.

The knowledge covered can support further learning in Python-based analytics and help build a foundation for more advanced projects involving business data, financial records, research datasets, and other analytical applications.  `,
    github: ""
},

"Python_Pandas_Basics_Course.jpg": {
    category: "Python · Pandas",
    issuer: "Simplilearn SkillUp",
    date: "28 October 2026",
    description: `

**This course strengthens my foundation in Python-based data analysis. I can apply Pandas to clean, manipulate, transform, and analyze datasets, while using Matplotlib to visualize findings. These skills complement my knowledge of Excel, SQL, Power BI, and Tableau and support my career goal of becoming a Data Analyst. I can apply these concepts to real-world datasets and develop data analytics projects for my portfolio.**

Python Pandas Basics Course

--Course Overview

The Python Pandas Basics Course introduces the Pandas library, a widely used Python tool for data analysis. The course covers topics ranging from basic operations to advanced techniques, including data manipulation, data visualization, statistical analysis, missing-data handling, group operations, time-series analysis, and dataset transformation.

The course also introduces practical applications of Pandas through data analysis tasks, including lung capacity analysis and weather data analysis. It aims to build a foundation for working with datasets and extracting useful insights through Python.

--Learning Objectives

- Understand the fundamental concepts of Pandas Series and DataFrames.
- Work with Pandas to organize, manage, and manipulate datasets.
- Explore Pandas functionalities for data analysis.
- Perform data cleaning and preprocessing.
- Handle missing data and carry out group operations.
- Apply data visualization and statistical analysis techniques.
- Merge and concatenate datasets from different sources.
- Reshape and transform datasets for analytical requirements.
- Perform time-series analysis to examine temporal trends and patterns.
- Apply Pandas to practical data analysis tasks.

--Topics Covered

1. Introduction to Pandas Series
   Understand the fundamental concepts of Pandas Series and their role in organizing and managing data in Python.
2. Pandas Two
   Explore advanced Pandas functionalities for manipulating and analyzing data more effectively for different applications.
3. Pandas Three
   Learn data visualization and statistical analysis techniques to gain insights from datasets.
4. Pandas Four
   Work with missing data and group operations while maintaining data accuracy and integrity.
5. Pandas Five
   Explore advanced data-processing techniques and optimization strategies for working with larger datasets.
6. Pandas Six
   Learn time-series data analysis using Pandas to examine temporal trends and patterns.
7. Pandas Seven
   Understand how to merge and concatenate datasets to integrate data from different sources for comprehensive analysis.
8. Pandas Eight
   Explore reshaping and transforming datasets to adapt data for specific analytical needs.
9. Pandas Nine
   Apply Pandas to practical data analysis tasks, including data cleaning and preprocessing.
10. Pandas Ten
    Consolidate learning by revisiting key concepts and exploring advanced topics as a foundation for more complex data analysis projects.
11. Analytics with Pandas
    Use Pandas for comparative data analysis and extract insights to support data-driven decisions.
12. Weather Data Analysis with Pandas
    Apply Pandas to weather data analysis and explore patterns and trends in meteorological data.
    
--Skills and Knowledge Areas

- Python
- Pandas
- Data Analysis
- DataFrames
- Data Cleaning
- Data Preprocessing
- Data Manipulation
- Statistical Analysis
- Data Visualization
- Time-Series Analysis
- Dataset Merging and Concatenation
- Data Transformation
- Weather Data Analysis
- MS Excel

--Practical Applications
The course content can be applied to:
- Organizing and analyzing structured datasets using Pandas DataFrames.
- Cleaning datasets and preparing them for analysis.
- Handling missing values and grouping records for analysis.
- Combining information from multiple datasets.
- Reshaping data to meet analytical requirements.
- Examining time-based data and identifying trends.
- Analyzing example datasets, including weather data and lung capacity data.
Who Should Learn This Course
The course is presented as relevant to learners interested in roles or areas such as:
- Data Analyst
- Data Engineer
- Data Scientist

--Conclusion

The Python Pandas Basics Course introduces the use of Pandas for organizing, cleaning, transforming, and analyzing data. Through its coverage of Series, DataFrames, visualization, statistical analysis, time-series analysis, and practical examples, the course provides foundational knowledge for working with data in Python.


    `,
    github: ""
},

    /*
     git training
    */


        "AMBI RAJAN-GIT TRAINING CERTIFICATE.jpeg": {
            category:
                "Software Development · Version Control · DevOps",
            issuer: "Simplilearn SkillUp",
            date: "August 2026",
            description: `
-Course Overview

Git Training is an introductory online course offered by Simplilearn SkillUp that focuses on version control, repository management, and collaborative development workflows. The course provides foundational knowledge of Git, a distributed version control system widely used to track changes, maintain project history, and manage source code efficiently.

Through this training, I developed an understanding of how Git helps organize development projects, record modifications, maintain different versions of files, and support collaboration through local and remote repositories. The course introduces essential Git commands and workflows that help make project development more structured, traceable, and manageable.

-Topics Covered

- **Git Fundamentals:** Understanding version control, Git architecture, repositories, and the purpose of tracking changes.
- **Git Installation and Configuration:** Learning the basics of setting up Git and configuring the development environment.
- **Repository Management:** Understanding how to initialize repositories, manage files, and maintain project history.
- **Essential Git Commands:** Learning commands for checking file status, staging changes, recording commits, and reviewing project history.
- **GitHub and Remote Repositories:** Understanding the relationship between Git and GitHub, including repository cloning, remote configuration, and synchronizing changes.
- **Branching and Merging:** Learning how branches support independent development and how merging combines changes from different branches.
- **Rebasing and Merge Conflict Resolution:** Understanding techniques for organizing commit history and identifying and resolving conflicting changes.
- **Collaborative Development:** Exploring version control workflows that support teamwork and shared project development.
- **Version History Navigation:** Understanding how to review commits and track the evolution of project files.

-Skills and Knowledge Gained

This training strengthened my foundational understanding of Git and version control concepts. I learned how repositories organize project files, how commits preserve snapshots of changes, and how branches support separate development tasks. I also gained an understanding of remote repository workflows, GitHub integration, merge conflicts, and project history management.

The knowledge gained is applicable to software development, web development, data analytics, and other technical projects that require organized file management and change tracking.

-Practical Application

I can apply these concepts when maintaining SQL scripts, Python files, project documentation, and website source code. Git and GitHub workflows also support the organization and presentation of personal projects by maintaining a record of development changes and making project files accessible through online repositories.

This training provides a foundation for applying version control practices to data analytics projects, technical learning activities, and portfolio development.

-Learning Outcome

The course provided a foundation in version control and Git-based project workflows. It helped me understand how to track project changes, maintain repository history, work with branches, manage remote repositories, and collaborate through shared development workflows. These concepts support my continued learning in data analytics, programming, and technical project development.
            `,
            github: ""
        },



 /*
    Data Analytics with Pytho
    */


        "Data Analytics with Python.jpeg": {
            category: "Data Analytics",
            issuer: "Simplilearn",
            date: "September 2025",
            description: `

-Course Overview

Data Analytics with Python introduces the fundamentals of Python programming and its application in data analysis. The course covers Python syntax, numerical computing, data manipulation, and visualization using libraries such as NumPy, Pandas, and Matplotlib. It focuses on developing programming skills and applying analytical techniques to practical problems and real-world datasets.

-Learning Objectives

- Understand Python fundamentals, syntax, and real-world applications.
- Use NumPy for numerical computing and data-related operations.
- Work with Pandas for data manipulation and analysis.
- Create data visualizations using Matplotlib.
- Apply Python to practical data analysis problems.
- Develop a foundation for data-driven tasks and computational work.

-Course Curriculum

Data Analytics with Python
Topics include Python fundamentals, syntax, programming principles, practical applications, and the use of Python for data analysis and visualization.\

Data Visualization and Analysis with Matplotlib and Pandas
Topics include data manipulation, visualization techniques, data presentation, analytical methods, and working with Pandas and Matplotlib to analyze and communicate data insights.

-Skills and Knowledge Areas

- Python Programming
- NumPy
- Pandas
- Matplotlib
- Data Analysis
- Data Manipulation
- Data Visualization
- Data Presentation
- Data Validation
- Analytical Thinking
- Programming Principles

-Practical Applications

The knowledge covered in this course can be applied to:
- Importing and working with datasets in Python.
- Cleaning, organizing, and manipulating data.
- Performing numerical and exploratory data analysis.
- Creating charts and visual representations of data.
- Presenting analytical findings to support data-driven decisions.

-Career Relevance

This course provides a foundation for entry-level data analytics learning and supports further development in Python-based analysis, data visualization, and data science. The skills can complement projects involving Excel, SQL, Power BI, and other data analysis tools.

**Conclusion**

Data Analytics with Python introduces essential programming and analytical concepts using Python, NumPy, Pandas, and Matplotlib. It provides a starting point for applying Python to data manipulation, analysis, and visualization tasks.

            `,
            github: ""
        },




 /*
    sql-data-science-python.jpg
    */


        "sql-data-science-python.jpg.jpeg": {
            category: "Data Science · SQL",
            issuer: "IBM",
            date: "September 2025",
            description: `

-Course Overview

Databases and SQL for Data Science with Python is an online course offered through Coursera. It introduces relational databases, SQL query writing, and the use of Python to access databases and work with data. The course covers SQL fundamentals, database tables, intermediate SQL techniques, and Python-based database access.

Learners explore how to retrieve, filter, organize, and combine data stored in relational databases. The course also introduces working with databases in Jupyter Notebook and applying SQL to real-world datasets. The course assignment uses multiple datasets related to the city of Chicago and evaluates the correctness of SQL queries and their results.

The course includes a bonus module on advanced SQL for data engineers. According to the course information, this bonus module is required for learners following the Data Engineering track, but not for learners following the Data Science or Data Analyst tracks.

-Learning Objectives

The main objective of this course is to build foundational skills in SQL and relational databases and introduce how Python can be used to access database information.

The key learning objectives include:

- Writing SQL statements to retrieve and manage data.
- Filtering and organizing query results.
- Creating, altering, and deleting database tables.
- Understanding relational database structure and table relationships.
- Using functions, grouping, joins, and subqueries.
- Working with data across multiple tables.
- Connecting Python to databases through Jupyter Notebook.
- Creating tables, loading data, and executing SQL queries from Python.
- Applying SQL to real-world datasets.
- Exploring advanced database topics such as views, stored procedures, and transactions in the bonus module.

-Course Curriculum

1. Getting Started with SQL

This module introduces SQL and its role in working with databases. It covers basic SQL statements and ways to retrieve, filter, and manage records.

Key concepts include:

- Introduction to SQL and databases.
- SELECT for retrieving data.
- INSERT for adding records.
- UPDATE for modifying records.
- DELETE for removing records.
- WHERE for filtering query results.
- COUNT for counting records.
- LIMIT for restricting the number of returned rows.
- DISTINCT for retrieving unique values.

This module establishes the foundations for writing queries and extracting relevant information from database tables.

2. Introduction to Relational Databases and Tables

This module introduces relational databases and the organization of information in tables. It includes creating tables in a MySQL database through a graphical interface and SQL scripts, as well as changing or removing table entries.

Key concepts include:

- Understanding relational databases.
- Organizing data into tables, rows, and columns.
- Creating database tables.
- Using SQL scripts to create tables.
- Altering table entries.
- Deleting entries from tables.
- Deleting tables when required.
- Understanding basic table-management operations.

This module helps learners understand how structured data is organized and how database tables can be created and maintained.

3. Intermediate SQL

This module introduces techniques for writing more complex queries and retrieving information from datasets.

Key concepts include:

- Searching data using string patterns.
- Filtering values within specified ranges.
- Sorting query results.
- Grouping data.
- Writing nested queries.
- Retrieving information from multiple tables.
- Using intermediate SQL techniques to answer data questions.

These techniques help learners write queries that go beyond basic data retrieval and support more detailed analysis.

4. Accessing Databases Using Python

This module introduces database access through Python and Jupyter Notebook. It covers creating tables, loading data, executing SQL queries, and using database tools available within a Python environment.

Key concepts include:

- Connecting Python to databases.
- Working with Jupyter Notebook.
- Creating database tables.
- Loading data into tables.
- Querying data using SQL magic.
- Using the SQLite Python library.
- Executing SQL queries from Python.
- Using Python to analyse database data.

This module demonstrates how SQL and Python can be used together in a data science workflow. SQL can retrieve and organize database information, while Python can support additional processing and analysis.

5. Course Assignment

The course assignment involves working with multiple real-world datasets related to the city of Chicago. Learners answer questions by writing SQL queries and are assessed on the correctness of their queries and results.

The assignment provides an opportunity to apply the SQL concepts covered in the course to practical data questions.

Key activities include:

- Reviewing the available datasets.
- Identifying the information needed to answer each question.
- Writing SQL queries to retrieve relevant records.
- Applying suitable query conditions and operations.
- Executing queries and reviewing their results.
- Checking that query outputs correctly answer the questions.

This assignment helps reinforce SQL query writing and the application of database concepts to real-world data.

6. Bonus Module: Advanced SQL for Data Engineers

This is a bonus module for learners following the Data Engineering track. The course information states that it is not required for learners following the Data Science or Data Analyst tracks.

Key topics include:

- Advanced SQL techniques.
- Views.
- Transactions.
- Stored procedures.
- Joins.

This module introduces additional database concepts that can support more advanced querying and database workflows.

-Skills and Knowledge Areas

The course identifies or covers the following skills and topics:

- SQL
- Relational Databases
- Database Management
- Python
- Jupyter Notebook
- Data Analysis
- Data Access
- Data Manipulation
- Query Languages
- Stored Procedures
- Transaction Processing
- MySQL
- SQLite
- SQL Magic
- SQL Filtering and Sorting
- Grouping and Aggregate Functions
- Subqueries and Nested Queries
- Joins
- Database Table Creation and Management

These topics provide a foundation for retrieving and analysing structured data and understanding how SQL works with Python in database-based workflows.

-Understanding the SQL and Python Workflow

The course concepts can be organized into a practical workflow:

**Step 1 — Identify the question:** Understand what information needs to be found in the dataset.

**Step 2 — Locate relevant tables:** Identify the tables and columns that contain the required information.

**Step 3 — Retrieve data:** Use SQL queries to select the relevant records and columns.

**Step 4 — Filter and organize results:** Apply conditions, sorting, grouping, and functions as needed.

**Step 5 — Combine data:** Use joins or nested queries when information is stored across multiple tables.

**Step 6 — Access databases with Python:** Use a Jupyter Notebook and supported database tools to execute SQL queries and work with database results.

**Step 7 — Validate results:** Review the output and confirm that the query answers the original question correctly.

This workflow illustrates how SQL and Python can support data access and analysis. The exact steps depend on the dataset and the question being investigated.

-Practical Applications

SQL and Python database skills can be applied in several areas.

**Data Retrieval:** Extract relevant records from relational databases using SQL queries.

**Data Filtering and Summarization:** Narrow datasets to relevant records and summarize information using functions and grouping.

**Multi-Table Analysis:** Combine information from related tables using joins and subqueries.

**Database Table Management:** Create and maintain tables and perform supported changes to database records.

**Python-Based Database Access:** Use Python and Jupyter Notebook to connect to a database, execute SQL, and work with query results.

**Real-World Data Analysis:** Apply SQL to datasets and answer questions using evidence from query results.

**Advanced Database Workflows:** Explore views, stored procedures, joins, and transactions through the bonus module.

These are potential applications of the course concepts. They should not be described as completed projects unless they were actually performed.

-Career Relevance

The course provides foundational knowledge relevant to data analytics, data science, and database-related work. SQL is widely used to retrieve and summarize data stored in relational databases, while Python can support further analysis and automation.

The concepts introduced in the course may be useful for roles such as:

- Junior Data Analyst
- Data Analyst Trainee
- Business Analyst
- Reporting Analyst
- Database Support Associate
- SQL Developer Trainee
- Business Intelligence Analyst Trainee

Further practice with real datasets and projects is important for developing confidence and proficiency in these skills.

-Conclusion

Databases and SQL for Data Science with Python introduces SQL fundamentals, relational database concepts, intermediate querying, and database access using Python. The course covers data retrieval and modification, filtering, grouping, joins, subqueries, table management, and working with databases in Jupyter Notebook.

Its practical assignment uses multiple Chicago-related datasets and evaluates the correctness of SQL queries and results. The optional bonus module introduces advanced SQL concepts such as views, stored procedures, joins, and transactions for learners following the Data Engineering track.

The knowledge covered provides a foundation for working with relational data and applying SQL and Python in data-analysis workflows.
 `,
            github: ""
        },



 /*
    Introduction to Data Analytics
    */


        "Introduction to Data Analytics.jpeg": {
            category: "Data Analytics",
            issuer: "IBM",
            date: "September 2025",
            description: `

-Course Overview

Introduction to Data Analytics is a beginner-friendly course offered by IBM through Coursera as part of the IBM Data Analyst Professional Certificate. The course introduces the fundamentals of data analytics, the modern data ecosystem, analytical workflows, and the role of data analysts in transforming raw data into meaningful insights.

The course provides an overview of how data is collected, stored, processed, cleaned, analyzed, and visualized to support informed decision-making. It also introduces different data-related career paths, the responsibilities of data professionals, and the tools and technologies used throughout the data analysis lifecycle.

Through the course modules, learners explore data structures, file formats, databases, data warehouses, data lakes, data pipelines, data processing, statistical analysis, data mining, and data visualization. The curriculum also covers data storytelling and the communication of analytical findings to different audiences.

A practical case study and final project provide opportunities to apply the concepts learned and understand how the stages of data analysis work together in a real-world scenario.

-Course Objectives

The main objective of this course is to establish a strong foundation in data analytics and help learners understand how analytical techniques support business and organizational decisions.

The course focuses on developing an understanding of the data analysis process, identifying different types of data and storage systems, exploring the modern data ecosystem, understanding the responsibilities of data professionals, and learning how analytical results can be communicated through visualizations and presentations.

-Topics Covered

1. Introduction to Data Analytics

This topic introduces the meaning, purpose, and importance of data analytics. It explores different types of data analysis and explains how organizations use data to identify patterns, evaluate performance, understand problems, and make informed decisions.

Learners are introduced to the responsibilities of data analysts and the stages of an analytical workflow, from gathering information to communicating findings.

2. The Data Ecosystem

This topic explores how data is collected, stored, processed, managed, and transferred across modern data systems.

It introduces different data structures, sources, and file formats, along with databases, data warehouses, data marts, data lakes, and data pipelines. It also provides an introduction to ETL (Extract, Transform, Load) processes, programming languages used by data professionals, and Big Data technologies such as Hadoop, Hive, and Spark.

3. Data Processing and Analytical Workflows

The course introduces the stages involved in preparing data for analysis. These include gathering data from relevant sources, understanding its structure, cleaning inconsistencies, transforming information into usable formats, and preparing data for further analysis.

These concepts help learners understand why data quality and appropriate processing are important for generating reliable analytical results.

4. Mining and Visualizing Data and Communicating Results

This module explores how statistical analysis and data mining techniques help uncover patterns, trends, and relationships within datasets.

It introduces methods for analyzing data and generating meaningful insights, along with data visualization and storytelling techniques for presenting analytical findings clearly.

Learners gain an understanding of how charts, dashboards, and data presentations can help communicate results and support decision-making.

5. Career Opportunities and Data Analysis in Action

This module explores career pathways and skill development opportunities for aspiring data analysts. It introduces the different responsibilities and capabilities associated with data-related roles.

The module also applies the key stages of data analysis—including data gathering, wrangling, analysis, and visualization—through a practical case study. It concludes with a final project that allows learners to demonstrate their understanding of the end-to-end data analysis workflow.

-Skills and Knowledge Gained

This course introduces and develops foundational knowledge in the following areas:

- Data Analytics Fundamentals
- Data Collection and Processing
- Data Wrangling and Preparation
- Statistical Analysis Fundamentals
- Data Mining and Pattern Identification
- Data Visualization and Dashboard Concepts
- Data Storytelling and Presentation
- Data Sources, Structures, and File Formats
- Databases and Data Warehousing Concepts
- Data Lakes, Data Marts, and Data Pipelines
- Extract, Transform, Load (ETL) Concepts
- Big Data Fundamentals
- Analytical Thinking and Problem-Solving
- Data-Driven Decision-Making
- Understanding Data Analyst Career Pathways

The course overview also identifies Microsoft Excel and analytical skills among the associated skills. This introductory course provides broad exposure to these concepts rather than advanced practical mastery of every listed technology.

-Understanding the End-to-End Data Analysis Process

An important learning outcome of this course is understanding how the different stages of data analytics connect to form a complete analytical workflow.

**Data Collection:** Gathering relevant information from appropriate sources to address a business or analytical question.

**Data Preparation:** Inspecting, cleaning, and organizing datasets to improve their quality and usability.

**Data Transformation:** Converting data into appropriate structures and formats for analysis.

**Data Analysis:** Examining the prepared data to identify trends, relationships, patterns, and useful findings.

**Data Visualization:** Representing results through charts, graphs, and dashboards to make information easier to interpret.

**Data Communication:** Explaining findings through reports, presentations, and data storytelling so that stakeholders can understand the results and make informed decisions.

Understanding this workflow provides a foundation for approaching data analysis systematically, from the initial question to the communication of the final findings.

-Understanding the Data Ecosystem

The course introduces the wider environment in which data professionals work.

Databases are used to organize and retrieve data. Data warehouses consolidate structured information for reporting and analysis. Data marts serve more focused analytical needs, while data lakes can store large amounts of data in different formats. Data pipelines support the movement and processing of data between systems.

ETL processes involve extracting data from source systems, transforming it into a suitable format, and loading it into a destination system. Big Data technologies such as Hadoop, Hive, and Spark are introduced as part of the broader ecosystem used to handle and process large datasets.

These concepts help learners understand that data analytics involves not only examining data but also understanding where it comes from, how it is stored, and how it becomes available for analysis.

-Practical Application

The concepts introduced in this course can be applied to business reporting, sales analysis, customer behavior analysis, operational performance monitoring, and other data-driven projects.

For example, a sales analysis project may involve collecting transaction data, cleaning inconsistent records, calculating sales metrics, identifying high-performing products, visualizing trends, and presenting the findings through a dashboard.

Similarly, an HR analytics project may involve examining employee data, identifying patterns in attrition, comparing departments, and communicating findings through charts and reports.

These examples illustrate how the course's foundational concepts can be applied in practical analytics work. The specific projects mentioned here are examples of possible applications, not claims that they were completed as part of this course.

-Career Relevance

This course provides introductory knowledge relevant to learners exploring careers in data analytics, business intelligence, data science, data engineering, and business analysis.

It helps learners understand how these roles differ and introduces the analytical concepts and technical environment used by data professionals.

For aspiring data analysts, the course provides a foundation for further learning in tools and technologies such as Excel, SQL, Python, and Power BI, as well as data visualization, dashboard development, and practical analytical projects.

-Learning Outcome

Through this course, I developed a foundational understanding of data analytics, the modern data ecosystem, and the end-to-end analytical workflow. The training introduced me to data collection, processing, wrangling, analysis, visualization, and communication, along with concepts related to databases, data warehouses, data lakes, ETL, and Big Data technologies.

The course also helped me understand the responsibilities of data analysts and the importance of communicating analytical findings clearly. These concepts support my continued development in data analytics and provide a foundation for applying analytical methods to practical projects.

-Conclusion

Introduction to Data Analytics by IBM provides an introduction to the principles, processes, and technologies that underpin modern data analysis. By exploring the data ecosystem, analytical workflows, visualization, data storytelling, and career opportunities, the course establishes a foundation for understanding how raw data can be transformed into meaningful information.

This learning experience supports continued development in analytical thinking, data preparation, visualization, and data-driven problem-solving, while providing a starting point for more advanced technical training and practical data analytics projects.
            `,
            github: ""
        },





 /*
   Industrial Biotechnology
    */

        "Industrial Biotechnology.jpeg": {
            category: "Biotechnology",
            issuer: "The University of Manchester",
            date: "September 2025",
            description: `
        
-Course Overview

Industrial Biotechnology is an online course available through Coursera that introduces the scientific principles, engineering methods, and technologies used to manufacture valuable products through biological systems. The course explores how enzymes, microorganisms, cells, and engineered biological systems can be used to develop sustainable alternatives to conventional chemical manufacturing.

Traditional industrial manufacturing often depends on fossil fuels and resource-intensive processes. Industrial biotechnology offers alternative approaches for producing chemicals, pharmaceuticals, materials, and renewable energy by applying biological catalysts and bioprocessing technologies. These approaches can support more sustainable production methods, improve manufacturing efficiency, and create new opportunities across healthcare, agriculture, energy, chemicals, and environmental applications.

The course examines key technologies that underpin industrial biotechnology, including enzyme discovery and engineering, systems and synthetic biology, biochemical engineering, and bioprocess design. It also explores practical industrial applications through case studies involving pharmaceutical manufacturing, fine chemicals, bioenergy, biomaterials, glycoscience, and biotherapeutics.

Alongside the technical concepts, the course introduces sustainable manufacturing, responsible research and innovation, bioethics, and the challenges involved in scaling biological processes from research to industrial production.

-Course Objectives

The primary objective of this course is to develop an understanding of how biological sciences and engineering principles can be combined to create commercially viable and sustainable manufacturing processes.

The course focuses on understanding enzyme function and catalysis, exploring the technologies behind synthetic biology, examining the design of bioprocesses, and understanding how biological production methods are applied in industry.

It also aims to help learners recognize the scientific, technical, economic, environmental, and ethical considerations involved in developing and commercializing industrial biotechnology products.

-Topics Covered

1. Enzymes, Enzyme Discovery and Engineering

This module introduces enzymes as biological catalysts that accelerate chemical reactions. Enzymes play an important role in biotechnology because they can enable chemical transformations under conditions that may be more selective or environmentally favorable than conventional chemical processes.

The module explores how enzymes support chemical manufacturing, drug discovery, therapeutics, and bioprocessing. It also introduces enzyme discovery and engineering as enabling technologies for developing new or improved biological catalysts.

Key concepts include:

- Enzyme function and biological catalysis.
- The role of enzymes in industrial biotechnology.
- Enzyme discovery and engineering.
- Enzyme applications in chemical manufacturing.
- Biological catalysts in drug discovery and therapeutics.
- Enzyme-enabled production of biofuels and industrial chemicals.

Understanding these concepts helps explain how biological catalysts can be used to develop efficient and selective manufacturing processes.

2. Methods in Systems and Synthetic Biology

This module explores systems biology and synthetic biology, which use biological knowledge and engineering approaches to understand, design, and modify biological systems.

Advances in reading and writing genome sequences have expanded the ability to design organisms with specific functions. Synthetic biology applies computational tools, genetic engineering, and experimental testing to develop biological systems capable of producing useful products.

The module introduces the design-build-test cycle, in which biological systems are designed, constructed, tested, and improved through repeated iterations.

Key concepts include:

- Fundamentals of systems biology and synthetic biology.
- Genome sequencing and genetic engineering concepts.
- Computational approaches to biological system design.
- Engineering microorganisms for specific functions.
- The design-build-test cycle.
- Applications in the bioindustry and production of high-value chemicals.
- Responsible research, bioethics, and regulatory or governance considerations.

These concepts help learners understand how engineered biological systems can be developed for industrial applications and why responsible innovation is important.

3. Biochemical and Bioprocess Engineering

This module introduces the engineering principles used to design and operate processes that rely on biological transformations.

Biochemical and bioprocess engineering combines biological knowledge with engineering methods to produce chemicals, biopharmaceuticals, biofuels, and other bio-based products. A complete bioprocess consists of integrated operations that work together to convert raw materials into useful products.

The module explains how process constraints, mathematical descriptions, and engineering decisions influence the design of production systems.

Key concepts include:

- Principles of biochemical engineering.
- Fundamentals of bioprocess design.
- Biological transformations in industrial production.
- Process constraints and engineering problem-solving.
- Unit operations and integrated process steps.
- Microbial platforms for product expression.
- Translating laboratory discoveries into industrial manufacturing.
- Economic viability and production scale-up.

This knowledge provides a foundation for understanding how biological processes can be developed beyond laboratory experiments and adapted for larger-scale production.

4. Pharmaceuticals and Fine Chemicals

This module focuses on using biocatalysis to manufacture pharmaceuticals, industrial monomers, fine chemicals, and personal care products.

Biocatalysis uses enzymes or whole cells to carry out chemical transformations. These biological catalysts can offer selective reaction pathways and provide alternatives to certain conventional chemical manufacturing methods.

The module presents industrial examples of enzyme-catalysed reactions and examines the manufacturing routes, reaction mechanisms, and sustainability considerations associated with these processes.

Key concepts include:

- Biocatalysis in pharmaceutical manufacturing.
- Enzyme-catalysed chemical transformations.
- Applications of isolated enzymes and whole-cell catalysts.
- Industrial monomers and fine chemical production.
- Enzyme stability and process performance.
- Cofactors and cofactor recycling.
- Multiphase reactions and manufacturing throughput.
- Process scale-up and sustainable manufacturing.

The module also considers factors that influence the successful industrial implementation of enzyme-based processes, including catalyst selection, stability, productivity, and manufacturing efficiency.

5. Case Studies: Bioenergy and Biomaterials

This module explores two important application areas of industrial biotechnology: renewable energy and advanced materials.

**Bioenergy**

Bioenergy is energy obtained from biomass, which includes biological materials such as plants, animal-derived materials, wood, and organic waste. Biological processes can convert these resources into useful energy carriers and fuels.

The module examines biofuel production and the scientific, technical, and economic challenges associated with increasing the contribution of bioenergy to sustainable energy systems.

Topics include biomass utilization, renewable energy production, biofuel manufacturing, sustainability considerations, and the challenges of developing cost-effective production processes.

**Biomaterials**

Biomaterials are materials designed for use in medical, industrial, and other applications. They may be derived from natural sources or produced through manufacturing methods involving materials such as polymers, metals, ceramics, and composites.

The module introduces biomaterials science, emerging materials, and their applications in medical and industrial products. It also considers current developments and future opportunities in biomaterials research and biomanufacturing.

Key concepts include:

- Biomass and renewable energy.
- Biofuel production technologies.
- Sustainable and cost-effective manufacturing.
- Biomaterials science and material development.
- Polymers, metals, ceramics, and composite materials.
- Medical and industrial biomaterial applications.
- Emerging biomanufacturing technologies.

This module demonstrates how industrial biotechnology can contribute to renewable energy, advanced materials, and sustainable manufacturing.

-6. Case Studies: Glycoscience and Biotherapeutics

This module introduces glycoscience, the study of carbohydrates and glycans and their roles in biological systems. Carbohydrates are important biological molecules that contribute to the structure and function of living organisms.

The module examines how glycoscience contributes to pharmaceutical development, personalized medicine, food security, and biomaterials. Case studies are used to illustrate important challenges and potential applications of glycan-based technologies.

The module also explores biopharmaceuticals, which are medicines produced using biological systems such as cells. Unlike many small-molecule drugs manufactured through conventional chemical synthesis, biopharmaceuticals often require complex biological production processes.

Key concepts include:

- Fundamentals of glycoscience.
- Biological roles of carbohydrates and glycans.
- Applications of glycan-based technologies.
- Biopharmaceutical development and production.
- Biological expression systems.
- Manufacturing safety and effectiveness considerations.
- Clinical, societal, and economic aspects of biotherapeutics.
- Applications in personalized medicine and healthcare.

This module demonstrates how biological sciences and biotechnology contribute to the development of complex medicines and other products with important healthcare and societal applications.

-Skills and Knowledge Gained

The course identifies the following associated skills and knowledge areas:

- Industrial Biotechnology
- Enzyme Function and Catalysis
- Enzyme Discovery and Engineering
- Systems Biology
- Synthetic Biology
- Biochemical Engineering
- Bioprocess Engineering
- Pharmaceutical Manufacturing
- Fine Chemical Production
- Bioenergy and Biofuel Technologies
- Biomaterials Science
- Biopharmaceuticals and Biotherapeutics
- Sustainable Technologies
- Manufacturing and Production
- Process Scale-Up and Scalability
- Responsible Research and Innovation
- Bioethics and Sustainability Considerations

These topics provide a broad understanding of the technologies and engineering principles involved in industrial biotechnology. Practical proficiency in individual laboratory, engineering, or manufacturing techniques requires additional training and experience.

-Understanding the Industrial Biotechnology Workflow

An important theme throughout the course is the process of converting biological discoveries into useful industrial products.

1. Biological Discovery: Identify useful enzymes, microorganisms, biological pathways, or other biological systems that can support a desired transformation.

2. Biological Engineering: Investigate or modify biological systems to improve their performance or enable a particular function.

3. Process Design: Determine how biological reactions can be integrated into a manufacturing process using appropriate equipment and operating conditions.

4. Production and Optimization: Evaluate process performance, including yield, stability, productivity, resource requirements, and other relevant constraints.

5. Scale-Up: Consider the challenges involved in translating laboratory processes into larger-scale production while maintaining quality, safety, and economic viability.

6. Product Application: Apply the resulting processes to manufacture useful products such as pharmaceuticals, fine chemicals, biomaterials, or biofuels.

This workflow illustrates the relationship between biological research, engineering, manufacturing, and commercial applications.

-Sustainability and Industrial Applications

Sustainability is a major theme of industrial biotechnology. Biological production methods may reduce dependence on fossil-derived raw materials or enable alternative manufacturing routes, although the environmental benefits depend on the specific process, feedstocks, energy requirements, and production conditions.

The course examines applications across several sectors:

- **Healthcare:** Biopharmaceuticals, therapeutics, and pharmaceutical intermediates.
- **Chemical manufacturing:** Fine chemicals, industrial monomers, and enzyme-enabled chemical transformations.
- **Energy:** Bioenergy and biofuel production from biomass.
- **Materials:** Biomaterials for medical and industrial applications.
- **Food and agriculture:** Potential applications of glycoscience and biological manufacturing technologies.
- **Environment:** Sustainable production approaches and opportunities to reduce reliance on conventional resource-intensive manufacturing.

The course also introduces responsible innovation and ethical considerations associated with emerging biotechnology research and its industrial implementation.

-Career Relevance

This course provides foundational knowledge relevant to learners interested in industrial biotechnology, bioprocess engineering, pharmaceutical manufacturing, biochemical engineering, bioenergy, biomaterials, and biotechnology research.

It helps learners understand the technologies that support biological manufacturing and the challenges involved in translating research into scalable industrial processes.

The knowledge may be relevant when exploring entry-level opportunities or further study in biotechnology, biomanufacturing, pharmaceutical production, process development, and related research areas. Actual job eligibility depends on the specific technical requirements, practical experience, and qualifications required by employers.

-Learning Outcome

This course provides a foundation for understanding how biological catalysts, engineered biological systems, and bioprocess engineering can be applied to industrial manufacturing.

It introduces the principles of enzyme catalysis, synthetic biology, bioprocess design, pharmaceutical production, bioenergy, biomaterials, glycoscience, and biotherapeutics. It also highlights the importance of sustainability, responsible research, and the technical and economic challenges involved in scaling biological production processes.

The knowledge gained supports a broader understanding of modern industrial biotechnology and its applications in healthcare, chemicals, energy, materials, and environmental sustainability.

-Conclusion

Industrial Biotechnology introduces the scientific and engineering foundations behind the use of biological systems for sustainable manufacturing. By exploring enzymes, synthetic biology, bioprocess engineering, pharmaceuticals, bioenergy, biomaterials, and biotherapeutics, the course provides a broad perspective on how biotechnology can address industrial and societal challenges.

The course connects biological discoveries with manufacturing applications and highlights the importance of process efficiency, scalability, sustainability, and responsible innovation. It provides a foundation for further learning in industrial biotechnology and related fields.
            `,
            github: ""
        },


 /*
   Introduction to R Programming
    */

"Introduction to R Programming.jpeg": {
    category: "DATA ANALYTICS · R PROGRAMMING",
    issuer: "University of Colorado Boulder · Coursera",
    date: "25 July 2025",
    description: `
        Completed Introduction to R Programming and Tidyverse,
        an online non-credit course authorized by the University
        of Colorado Boulder and offered through Coursera.
-Course Overview

Introduction to R Programming and Tidyverse is an online course offered by the University of Colorado Boulder through Coursera. It is part of the Expressway to Data Science: R Programming and Tidyverse Specialization.

The course introduces the R programming language and its application in data analysis, data manipulation, and data visualization. It is designed for beginners who want to develop programming skills for data analysis, as well as learners who already have some programming experience and want to understand R and the Tidyverse ecosystem.

The training focuses on writing readable and reusable R code, creating functions, manipulating datasets, visualizing information with ggplot2, and producing reproducible analytical documents using R Markdown.

Through a structured learning approach, the course introduces programming fundamentals and demonstrates how R can be used to organize, analyze, and communicate data-driven findings. It provides a foundation for further learning in statistical analysis, exploratory data analysis, and data science.

-Course Objectives

The main objective of this course is to develop foundational R programming skills and introduce practical techniques for performing reproducible data analysis.

The course focuses on understanding the R programming environment, writing functions, applying data manipulation techniques, creating visualizations, and documenting analytical workflows. It also introduces good programming practices that make code easier to read, reuse, maintain, and share.

-Topics Covered

1. Introduction to R, RStudio and R Markdown

This module introduces the R programming language and the RStudio development environment. It covers installing and configuring R and RStudio, understanding basic R syntax, executing commands through the console, and installing the packages required for analysis.

The module also introduces reproducibility in data analysis and explains how R Markdown can be used to combine code, written explanations, and analytical outputs in a single document.
Key concepts include:
- Installing and configuring R and RStudio.
- Understanding basic R commands and programming syntax.
- Working with R packages.
- Executing code in the RStudio console.
- Understanding reproducible analytical workflows.
- Creating an R Markdown document.

2. Functions in R

This module focuses on creating and using functions in R. Functions allow repetitive tasks to be organized into reusable blocks of code, helping make analytical programs more efficient and maintainable.

The module explores function syntax, function creation best practices, default arguments, and argument validation.
Key concepts include:
- Understanding function structure and syntax.
- Writing custom functions.
- Using function arguments and return values.
- Defining default argument values.
- Validating function inputs.
- Improving code readability and reusability.

3. Data Visualization Using ggplot2

This module introduces ggplot2, an R package used to create data visualizations. It explains how graphical elements and aesthetic mappings work together to represent information visually.

The module introduces the principles behind constructing plots and organizing visual components into layers.
Key concepts include:
- Understanding the ggplot2 package.
- Mapping variables to visual properties.
- Working with graphical layers.
- Understanding aesthetics such as position, color, and shape.
- Creating visual representations of data.
- Developing a foundation for communicating analytical findings through charts.

4. Data Analysis with dplyr

This module introduces dplyr, a Tidyverse package designed to make data manipulation and transformation more readable and efficient.

It covers essential data manipulation verbs used to select columns, filter observations, arrange records, create or modify variables, group data, and calculate summaries.
Key concepts include:
- select() — choosing specific columns.
- filter() — selecting rows that meet conditions.
- arrange()  — sorting observations.
- mutate()  — creating or modifying columns.
- group_by()  — organizing data into groups.
- summarize()  — calculating summary statistics.
These operations are useful for preparing datasets, exploring patterns, and producing summaries before visualization or further analysis.

-Skills and Knowledge Gained

The course introduces foundational skills in:
- R Programming
- RStudio
- Tidyverse
- Data Manipulation
- Data Analysis
- Data Visualization
- ggplot2
- dplyr
- R Markdown
- Function Creation
- Programming Principles
- Reproducible Research
- Data Presentation
- Visualization Aesthetics
- Software and Package Installation
The training emphasizes the fundamentals of using R and its associated tools. Further practice with real datasets is important for developing advanced proficiency in these areas.

-Understanding the Analytical Workflow

An important learning outcome is understanding how programming, data manipulation, visualization, and documentation can be combined in a reproducible analytical workflow.

**Data Preparation:** Load a dataset into R and inspect its structure and variables.

**Data Manipulation:** Use dplyr to select relevant columns, filter records, create variables, group observations, and calculate summaries.

**Data Visualization:** Use ggplot2 to represent patterns and relationships through appropriate charts.

**Reusable Programming:** Create functions to organize repeated operations and improve code maintainability.

**Documentation:** Use R Markdown to combine code, explanations, and outputs into a report that can be regenerated by running the document.

Together, these concepts provide a foundation for developing analytical projects that are easier to understand, reproduce, and maintain.

-Practical Application
The concepts covered in this course can be applied to exploratory data analysis, sales analysis, biological data analysis, research reporting, and other analytical tasks.
For example, a sales dataset can be imported into R, cleaned and summarized using dplyr, and visualized using ggplot2 to examine sales trends or compare product categories. The analysis can then be documented using R Markdown so that the code and findings remain together in a reproducible report.

Similarly, biological datasets can be organized, summarized, and visualized to support exploratory analysis and research communication.
These are examples of how the course concepts may be applied; they are not claims that these specific projects were completed as part of the course.

-Career Relevance

This course provides a foundation for learners interested in data analytics, statistical programming, data science, and research-oriented analytical work.

R is used in statistical analysis, scientific research, data visualization, and exploratory data analysis. Knowledge of Tidyverse packages can help analysts write clear data transformation workflows and create meaningful visualizations.

The skills introduced in this course can complement learning in Excel, SQL, Python, Power BI, and other analytical tools. They can also support the development of reproducible analytical projects for a professional portfolio.

-Learning Outcome

Through this course, I developed a foundational understanding of R programming, reusable functions, data manipulation with dplyr, visualization with ggplot2, and reproducible documentation using R Markdown.

The training introduced me to programming practices that help make analytical code more readable and reusable. It also strengthened my understanding of how data preparation, transformation, visualization, and reporting fit together in an analytical workflow.

These concepts support my continued development in data analytics and provide a foundation for applying R to practical datasets and analytical projects.

-Conclusion

Introduction to R Programming and Tidyverse provides an introduction to programming and analytical workflows using R. By covering functions, data manipulation, data visualization, and reproducible documentation, the course establishes a foundation for writing organized analytical code and communicating data-driven findings.

The knowledge gained can support further learning in statistical analysis, exploratory data analysis, data science, and research reporting, while providing a starting point for practical R-based portfolio projects.
    `,
    github: ""
},




 /*
    data-analysis-for-biologists
    */




        "data-analysis-for-biologists.jpg.jpeg": {
            category: "Data Analysis · Biology",
            issuer: "NPTEL",
            date: "March 2025",
            description: `
                This course connects data analysis with biological
                applications and supports my interest in combining
                biotechnology knowledge with analytical methods.
            `,
            github: ""
        },



 /*
     workshop
    */


        "molecular-docking-figures.jpg.jpeg": {
            category: "Scientific Tools",
            issuer: "Research Boulevard",
            date: "December 2024",
            description: `
                This training focused on molecular docking and
                publication-ready figure generation using
                open-source tools, supporting scientific research
                and visualization skills.
                here is recorded video download it and learn and build your skills-------(-------------------------------------download link-------------------------------------)------
            `,
            github: ""
        },



 /*
     workshop 
    */



        "pharmacophore-screening.jpg.jpeg": {
            category: "Scientific Learning",
            issuer: "Research Boulevard",
            date: "December 2024",
            description: `
                This learning experience covered pharmacophore
                and multi-ligand docking-based virtual screening,
                connecting computational tools with biotechnology
                and molecular research.
                here is recorded video download it and learn and practice using computational tools,build your skills--------(------------------------------download link----------------------------)----------
            `,
            github: ""
        },



 /*
     doctor's lab
    */



        "Doctor's Laboratory.jpeg": {
            category: "Internship · Laboratory Training",
            issuer: "Doctors Laboratory",
            date: "December 2024",
            description: `
                Laboratory training experience included in my
                professional learning history. Add the specific
                laboratory techniques and responsibilities from
                your training record here.
            `,
            github: ""
        },



 /*
     bioline lab
    */


        "Bioline Laboratory.jpeg": {
            category: "Internship · Laboratory Training",
            issuer: "Bioline Laboratory",
            date: "July 2024",
            description: `
                Laboratory training experience included in my
                biotechnology background. Add the specific
                practical activities from your training record here.
            `,
            github: ""
        },

 /*
     sports 
    */



        "sports-achievement-2024.jpg.jpeg": {
            category: "Sports Achievement · Recognition",
            issuer: "Department of Biotechnology, KCT",
            date: "April 2024",
            description: `
                Recognition associated with my participation and
                achievement in college activities. Refer to the
                certificate for the exact award and recognition details.
            `,
            github: ""
        },

 /*
     bioindustry conclave
    */



        "bioindustry conclave 2024.jpeg": {
            category: "Bioindustry · Recognition",
            issuer: "Kumaraguru College of Technology",
            date: "April 2024",
            description: `
Organized by: Department of Biotechnology, Kumaraguru College of Technology (KCT), Coimbatore
Date: 26–27 April 2024
Theme: Academia–Industry Dialogues: Exploring Opportunities in the Bioindustry
Attended the Bioindustry Conclave 2024 to gain knowledge about the biotechnology industry through insights and experiences shared by industry professionals and experts.
Gained insights into current trends and career opportunities in the bioindustry.
Learned about real-world industry experiences and professional perspectives.
Understood the importance of collaboration between academic institutions and industry.
Explored emerging developments in biotechnology, biopharmaceuticals, and related sectors.
Gained awareness of industry expectations, skill development, and career growth pathways.
            `,
            github: ""
        },


 /*
     ball badminton
    */

        

        "ball-badminton-2023.jpg.jpeg": {
            category: "Sports Achievement",
            issuer: "CIT",
            date: "March 2023",
            description: `
                Certificate recognising third-place achievement
                in Ball Badminton at the 4th CIT Covai Ties event.
            `,
            github: ""
        }
    };


    function getCertificateDetails(button, imagePath) {

        const card = button.closest(".certificate-card");

        const title =
            card?.querySelector(".certificate-content h3")
                ?.textContent.trim() || "Certificate";

        const category =
            card?.querySelector(".certificate-category")
                ?.textContent.trim() ||
            card?.querySelector(".project-category")
                ?.textContent.trim() ||
            "Certificate";

        const issuer =
            card?.querySelector(".certificate-issuer")
                ?.textContent.trim() || "Not specified";

        const date =
            card?.querySelector(".certificate-date")
                ?.textContent.trim() || "Not specified";

        // Use the actual image filename to find its details.
        const filename =
            imagePath.split("/").pop();

        const extra = certificateDetails[filename] || {};

        return {
            title,
            category: extra.category || category,
            issuer: extra.issuer || issuer,
            date: extra.date || date,
            description:
                extra.description ||
                "Add a detailed description for this certificate in the certificateDetails object in js/script.js.",
            github: extra.github || ""
        };
    }


    function openCertificate(button) {

        if (!certificateModal || !modalImage) {
            console.error(
                "Certificate modal elements were not found."
            );
            return;
        }

        const imagePath =
            button.getAttribute("data-certificate");

        if (
            !imagePath ||
            imagePath.endsWith("/.jpeg") ||
            imagePath.endsWith("/jpeg")
        ) {
            console.error(
                "This certificate button has an invalid image path:",
                imagePath
            );
            return;
        }

        const details =
            getCertificateDetails(button, imagePath);

        modalImage.src = imagePath;
        modalImage.alt = details.title;

        if (modalOpen) {
            modalOpen.href = imagePath;
        }

        if (descriptionTitle) {
            descriptionTitle.textContent = details.title;
        }

        if (descriptionCategory) {
            descriptionCategory.textContent =
                details.category;
        }

        if (descriptionIssuer) {
            descriptionIssuer.textContent =
                details.issuer;
        }

        if (descriptionDate) {
            descriptionDate.textContent =
                details.date;
        }

        if (descriptionText) {
            descriptionText.textContent =
                details.description.trim();
        }

        if (descriptionGithub) {

            if (details.github) {
                descriptionGithub.href = details.github;
                descriptionGithub.hidden = false;
            } else {
                descriptionGithub.removeAttribute("href");
                descriptionGithub.hidden = true;
            }
        }

        certificateModal.classList.add("open");

        certificateModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add("modal-open");

        if (modalClose) {
            modalClose.focus();
        }
    }


    function closeCertificate() {

        if (!certificateModal) return;

        certificateModal.classList.remove("open");

        certificateModal.setAttribute(
            "aria-hidden",
            "true"
        );

        if (modalImage) {
            modalImage.src = "";
        }

        if (modalOpen) {
            modalOpen.href = "#";
        }

        document.body.classList.remove("modal-open");
    }


    certificateButtons.forEach(button => {

        button.addEventListener("click", () => {
            openCertificate(button);
        });

    });


    if (modalClose) {
        modalClose.addEventListener(
            "click",
            closeCertificate
        );
    }


    if (modalBackdrop) {
        modalBackdrop.addEventListener(
            "click",
            closeCertificate
        );
    }


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeCertificate();
        }

    });


});
