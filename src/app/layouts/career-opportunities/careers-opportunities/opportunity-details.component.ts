import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataStorageService } from '../../../shared/service/data-storage.service';
import { Location } from '@angular/common';


@Component({
    selector: 'app-opportunity-details',
    templateUrl: './opportunity-details.component.html',
    styleUrls: ['./opportunity-details.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OpportunityDetailsComponent implements OnInit, AfterViewInit {

    careerOpportunities = [
        {
            jobTitle: 'Engineering',
            jobs: [
                {jobId: 1, jobTitle: 'Java Senior Developer', isChecked: false,
                answer: '<div> <strong>Key Skills</strong> <ul class="java_key_skill"> <li>Hands-on experience in <b>Java</b>/J2EE programming</li> <li>Experience on Core <b>Java</b></li> <li>Experience on Hibernate</li> <li>Experience on Spring framework</li> <li>Webservices</li> <li>MVC Framework</li> </ul></div> <div><strong>Key Responsibilities</strong> <ul class="java_key_responsibilities"> <li>Designs and develops application as per the requirements</li> <li>Understands and Supports the existing application.</li> <li>Co-ordinates with Business/stakeholders for issue resolution</li> <li>Follows good programming practices</li>  </ul>  </div>'},
                {jobId: 2, jobTitle: 'UI Architect', isChecked: false,
                answer: '<div><strong>Key Skills</strong> <ul class="ui_key_skills"> <li>10+ years of previous related work experience required</li> <li>Min 4 yrs of experience with Angular JS</li> <li>7-10 yrs of overall front-end/UI/full stack development and architecture experience and end-to-end implementation experience</li> <li>3 -5 years of previous experience with Digital solutions and architecture</li> <li>Experience implementing frameworks such as Angular JS</li> <li>Cloud Deployment Experience</li> <li>Knowledge and experience using industry best practices </li> <li>Experience working as part of Agile product teams</li> <li>Experience with cloud technologies, providers and application design considerations.</li> <li>Demonstration of knowledge pertaining to IT Security best practices and integration with application authorization and access</li> </ul> </div> <div><strong>Key Responsibilities</strong> <ul class="ui_key_responsibilities"> <li>Provide leadership and architectural guidance to the development team in Front End technologies</li> <li>Responsible for overall design, and implementation guidance for projects that require front end technologies</li> <li>Oversight of front end release and deployment strategy </li> </ul> </div>'},
                {jobId: 3, jobTitle: 'AI Solution Architect', isChecked: false,
                answer: '<p><strong>Description</strong> Are you passionate about Artificial Intelligence, Machine Learning and Deep Learning? Are you passionate about helping customers build solutions leveraging the state-of-the-art AI/ML/DL tools.<br> RI is looking for an AI Solutions Architect (AI SA), who will be the Subject Matter Expert (SME) for helping customers design machine learning solutions that leverage the AI stack. You will partner with Solution Architects, Sales, Business Development and the AI Service teams to enable customer adoption and revenue attainment. You will develop white papers, blogs, reference implementations, labs, and presentations on AI design patters and best practices. </p> <div><strong>Key Skills</strong> <ul class="ai_key_skills"> <li>Very strong understanding and experience in the field of AI, Machine Learning, Deep Learning and related technologies</li> <li>Deep experience developing AI models in real-world environments and integrating AI/ML and other services into large-scale production applications</li> <li>2+ years design/implementation/consulting experience building cloud solutions</li> <li>5+ years professional experience in software development in languages like Java, Python, Scala. Experience working with RESTful API and general service oriented architectures</li> <li>5+ years professional experience in software development in languages like Java, Python, Scala. Experience working with RESTful API and general service oriented architectures</li> </ul> </div> <div> <ul class="ai_key_responsibilities"> <li>Work with customer’s AI team to deeply understand their business and technical needs and design AI solutions that make the best use of AI Services</li> <li>Thought Leadership </li> <li>Partner with SAs, Sales, Business Development and the AI Service teams to accelerate customer adoption and revenue attainment</li> <li>Act as a technical liaison between customers and the service engineering teams and providing produce improvement feedback</li> <li>Develop and support an internal community of AI related subject matter experts</li> </ul> </div>'},
                {jobId: 4, jobTitle: 'Data Scientist', isChecked: false, 
                answer: '<p><strong>Description</strong>The ideal candidate is adept at using large data sets to find opportunities for product and process optimization and using models to test the effectiveness of different courses of action. They must have strong experience using a variety of data mining/data analysis methods, using a variety of data tools, building and implementing models, using/creating algorithms and creating/running simulations. They must have a proven ability to drive business results with their data-based insights. They must be comfortable working with a wide range of stakeholders and functional teams. The right candidate will have a passion for discovering solutions hidden in large data sets and working with stakeholders to improve business outcomes. </p> <div><strong>Key Skills</strong> <ul class="data_key_skills"> <li>Strong problem solving skills with an emphasis on product development</li> <li>Experience using statistical computer languages (R, Python, SLQ, etc.) to manipulate data and draw insights from large data sets</li> <li>Experience working with and creating data architectures</li> <li>Knowledge of a variety of machine learning techniques (clustering, decision tree learning, artificial neural networks, etc.) and their real-world advantages/drawbacks</li> <li>Knowledge of advanced statistical techniques and concepts (regression, properties of distributions, statistical tests and proper usage, etc.) and experience with applications</li> <li>Excellent written and verbal communication skills for coordinating across teams</li> <li>A drive to learn and master new technologies and techniques</li> <li>We’re looking for someone with 5-7 years of experience manipulating data sets and building statistical models, has a Master’s or PHD in Statistics, Mathematics, Computer Science or another quantitative field, and is familiar with the following software/tools: <ul> <li>Coding knowledge and experience with several languages: C, C++, Java</li> <li>JavaScript, etc.</li> <li>Knowledge and experience in statistical and data mining techniques: GLM/Regression, Random Forest, Boosting, Trees, text mining, social network analysis, etc.</li> <li>Experience querying databases and using statistical computer languages: R, Python, SLQ, etc.</li> <li>Experience using web services: Redshift, S3, Spark, DigitalOcean, etc.</li> <li>Experience creating and using advanced machine learning algorithms and statistics: regression, simulation, scenario analysis, modeling, clustering, decision trees, neural networks, etc.</li> <li>Experience analyzing data from 3rd party providers: Google Analytics, Site Catalyst, Coremetrics, Adwords, Crimson Hexagon, Facebook Insights, etc.</li> <li>Experience with distributed data/computing tools: Map/Reduce, Hadoop, Hive, Spark, Gurobi, MySQL, etc.</li> <li>Experience visualizing/presenting data for stakeholders using: Periscope, Business Objects, D3, ggplot, etc.</li> </ul> </li> </ul> </div> <div><strong>Key Responsibilities</strong><ul class="data_key_responsibilities"> <li>Work with stakeholders throughout the organization to identify opportunities for leveraging company data to drive business solutions</li> <li>Mine and analyze data from company databases to drive optimization and improvement of product development, marketing techniques and business strategies</li> <li>Assess the effectiveness and accuracy of new data sources and data gathering techniques</li> <li>Develop custom data models and algorithms to apply to data sets</li> <li>Use predictive modeling to increase and optimize customer experiences, revenue generation, ad targeting and other business outcomes</li> <li>Develop company A/B testing framework and test model quality</li> <li>Coordinate with different functional teams to implement models and monitor outcomes</li> <li>Develop processes and tools to monitor and analyze model performance and data accuracy</li> </ul> </div>'}
            ]
        },
        {
            jobTitle: 'Sales/Marketing/Others',
            jobs: [
                {jobId: 5, jobTitle: 'CMO- Analytics Driven Technology', isChecked: false,
                answer: '<p>We are looking for highly motivated and passionate individuals who has built Comprehensive product marketing plan that centers on consumer requirements from idea to production and distribution.<br> Candidate should be a believer in the lean startup philosophy.<br> Thorough knowledge of marketing principles, brand, product and service management. Deep understanding of changing market dynamics.<br> A person in this role should be comfortable in an "all hands on deck" environment, love solving problems, love developing teams and people talent, and be able to thrive in a start-up culture.<br><br> 10 + years of marketing experience, preferably in a fast-paced startup environment or a larger company with a strong entrepreneurial culture, with a Masters degree from premier institute.Experience with product marketing including marketing strategy, product positioning, brand strategy and user research.<br> Demonstrated success in designing and delivering on marketing strategies and programmes, in both B2C and B2B environments and/or marketing/advertising agencies / Telcos / Retail / e-commerce / CPG if possible.<br> Experience making data-driven marketing and sales decisions using surveys, focus groups, A/B testing, and other analytical tools , and demonstrated business sense and intuition through successful marketing projects at Large scale.<br> Extremely adaptable to change and ability to execute quickly, leveraging a team.<br> A track record of having attracted, hired and/or managed and developed a large, high-performing team</p>'},
                {jobId: 6, jobTitle: 'Digital Marketing', isChecked: false, 
                answer: '<p> Our ideal candidate has 4+ years of relevant experience (preferably from fast-growing b2c companies), specializes in PPC Campaigns and has the ability to strategize, execute and improvise on campaigns to achieve the desired results. </p><div><strong>Key Responsibilities</strong> <ul class="key_responsibilities"> <li>Brainstorm new and creative growth strategies which are focussed on our industry of co-living spaces</li> <li>Handle Paid promotions, Google AdWords &amp; Facebook adverts optimizing them for maximum ROI</li> <li>Manage the Social Media, SEO and Content strategy of the business</li> <li>Set up campaigns and build community through social media channels such as Facebook, Twitter, LinkedIn, YouTube and Instagram</li> <li>Optimize the budget for paid marketing based on our property listings and vacancy in those buildings.</li> <li>Generate quality leads for our properties and optimize lead capturing funnel</li> <li>Drive organic growth of the website and app</li> <li>Collaborate with agencies and other vendor partners and work with affiliate partners</li> <li>Sync up with the design team and manage mailers - promotion, awareness, offers, etc.</li> </ul> </div> <div><strong>Key Skills</strong> <ul class="key_skills"> <li>Prior experience (4+ years) in setting up and optimizing Google AdWords campaigns and Google Analytics</li> <li>Demonstrable experience in leading and managing SEO/SEM, PPC marketing database, email, SMM, Influencer marketing and display advertising</li> <li> Possesses digital marketing skills (email, social, paid media, search) and understanding of an end-to-end marketing process</li> <li>Familiar with HTML/CSS/Javascript</li> <li>Excellent communication skills</li> </ul> </div> <div><strong>Other Details</strong> <ul class="key_skills"> <li>Remuneration: As per the market standards</li> <li>Location: Bangalore</li> <li>Office Location: BTM Layout</li> </ul> </div><p></p>'}
            ]
        }
    ];

    expandedJobId: any;
    jobDescription: any;

    constructor(public dataStorage: DataStorageService, private location: Location,
        private route: ActivatedRoute) {
      
    }

    ngOnInit() {
    }

    ngAfterViewInit(){
        this.route.queryParams.subscribe(params => {
            if(params.category && params.opportunity){
                setTimeout(() => {
                    if(!!this.careerOpportunities.find(x=>x.jobTitle == params.category)){
                        this.careerOpportunities.find(x=>x.jobTitle == params.category).jobs.forEach(item => {
                            if(item.jobTitle == params.opportunity){
                            
                                const element = document.getElementById(params.category) as HTMLInputElement;
                                if(!!element)
                                    element.scrollIntoView({ behavior: 'smooth' , block: "start"});

                                item.isChecked = true;

                            }
                        });
                    }
                }, 100);
               
                
                //this.location.replaceState(this.dataStorage.globalPathInformation.INTERVIEWER.PATH);
            }
          });
    }

    getJobDescription(jobId){
        if(jobId) {
            this.expandedJobId = jobId;
            // this.careerOpportunities.forEach(element => {
            //     element.jobs.filter(x => x.jobId != jobId).map(y => y.isChecked = false);
            // });
            this.jobDescription = 'this is job description of '+ jobId;
        }
    }
}
