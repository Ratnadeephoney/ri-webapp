import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router } from '@angular/router';
import { map } from 'rxjs/internal/operators';
import { filter } from 'rxjs/operators';
import { DataStorageService } from '../../../service/data-storage.service';


@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BreadcrumbComponent implements OnInit {

  public url: any;
  public breadcrumbs;
  public title: string;
  public pageName:  string;
  public path: any;
  @Input('page') page: any;
  //skillsTechDesignation = [{"id":118,"type":"Skill","name":"ABAP"},{"id":129,"type":"Skill","name":"adf"},{"id":34,"type":"Skill","name":"Advance Java"},{"id":135,"type":"Skill","name":"Advanced Java"},{"id":154,"type":"Skill","name":"AJAX"},{"id":8,"type":"Skill","name":"Amazon cloud"},{"id":162,"type":"Skill","name":"Analytics"},{"id":60,"type":"Skill","name":"Android"},{"id":166,"type":"Skill","name":"Angular"},{"id":132,"type":"Skill","name":"Angular JS"},{"id":136,"type":"Skill","name":"Appium"},{"id":125,"type":"Skill","name":"Appium Testing"},{"id":172,"type":"Skill","name":"Automated Testing"},{"id":173,"type":"Skill","name":"Automation Testing"},{"id":7,"type":"Skill","name":"AZURE"},{"id":163,"type":"Skill","name":"Big Data"},{"id":100,"type":"Skill","name":"Bootstrap"},{"id":165,"type":"Skill","name":"Business Analyst"},{"id":122,"type":"Skill","name":"C"},{"id":121,"type":"Skill","name":"C / C ++"},{"id":11,"type":"Skill","name":"C++"},{"id":2,"type":"Skill","name":"Cassandra"},{"id":27,"type":"Skill","name":"Cognos"},{"id":33,"type":"Skill","name":"Core Java"},{"id":143,"type":"Skill","name":"CSS"},{"id":144,"type":"Skill","name":"CSS3"},{"id":126,"type":"Skill","name":"Cucumber"},{"id":48,"type":"Skill","name":"Data Mining in Analysis Services"},{"id":176,"type":"Skill","name":"Data Science"},{"id":26,"type":"Skill","name":"Data Stage"},{"id":117,"type":"Skill","name":"Dataware"},{"id":151,"type":"Skill","name":"DevOps"},{"id":13,"type":"Skill","name":"Digital Marketing"},{"id":168,"type":"Skill","name":"Dot Net"},{"id":24,"type":"Skill","name":"ETL"},{"id":42,"type":"Skill","name":"Excel"},{"id":181,"type":"Skill","name":"Finance"},{"id":175,"type":"Skill","name":"Full Stack Developer"},{"id":16,"type":"Skill","name":"Graphic Designer"},{"id":1,"type":"Skill","name":"Hadoop"},{"id":82,"type":"Skill","name":"HANA"},{"id":68,"type":"Skill","name":"Hardware Networking"},{"id":3,"type":"Skill","name":"Hive"},{"id":127,"type":"Skill","name":"hjs@"},{"id":182,"type":"Skill","name":"HR Function"},{"id":141,"type":"Skill","name":"HTML"},{"id":142,"type":"Skill","name":"HTML 5"},{"id":31,"type":"Skill","name":"Hyperion"},{"id":25,"type":"Skill","name":"Informatica"},{"id":62,"type":"Skill","name":"Ionic"},{"id":59,"type":"Skill","name":"IOS"},{"id":124,"type":"Skill","name":"JAVA"},{"id":54,"type":"Skill","name":"Jscript"},{"id":55,"type":"Skill","name":"Jscript .Net"},{"id":138,"type":"Skill","name":"JSP"},{"id":158,"type":"Skill","name":"Linux"},{"id":35,"type":"Skill","name":"Linux Development"},{"id":39,"type":"Skill","name":"Linux Kernel"},{"id":37,"type":"Skill","name":"Linux Server Administrator"},{"id":38,"type":"Skill","name":"Linux Support Engineer"},{"id":36,"type":"Skill","name":"Linux System Administrator"},{"id":40,"type":"Skill","name":"Linux System Engineer"},{"id":87,"type":"Skill","name":"Manual Testing"},{"id":43,"type":"Skill","name":"Microsoft Dynamics AX"},{"id":44,"type":"Skill","name":"Microsoft Dynamics CRM"},{"id":174,"type":"Skill","name":"Mobile Automation Testing"},{"id":86,"type":"Skill","name":"Mobile Testing"},{"id":160,"type":"Skill","name":"Mongo DB"},{"id":50,"type":"Skill","name":"MS SQL Server"},{"id":167,"type":"Skill","name":"MS Technologies"},{"id":51,"type":"Skill","name":"MVC"},{"id":67,"type":"Skill","name":"Network Administrator"},{"id":66,"type":"Skill","name":"Network Engineer"},{"id":69,"type":"Skill","name":"Network Security"},{"id":71,"type":"Skill","name":"Network Support"},{"id":70,"type":"Skill","name":"Network Testing"},{"id":64,"type":"Skill","name":"Node JS"},{"id":30,"type":"Skill","name":"OBIEE"},{"id":164,"type":"Skill","name":"Oracle"},{"id":17,"type":"Skill","name":"Oracle  Ebussiness Suite"},{"id":76,"type":"Skill","name":"Oracle ADF"},{"id":75,"type":"Skill","name":"Oracle Apps Dba"},{"id":18,"type":"Skill","name":"Oracle Apps Functional"},{"id":19,"type":"Skill","name":"Oracle Apps Technical"},{"id":74,"type":"Skill","name":"Oracle DBA"},{"id":78,"type":"Skill","name":"Oracle Financials"},{"id":10,"type":"Skill","name":"Oracle Fusion"},{"id":73,"type":"Skill","name":"Oracle Pl /SQL"},{"id":77,"type":"Skill","name":"Oracle SOA"},{"id":72,"type":"Skill","name":"Oracle SQL"},{"id":20,"type":"Skill","name":"PeopleSoft - Technical"},{"id":21,"type":"Skill","name":"Peoplesoft-Functional"},{"id":161,"type":"Skill","name":"PERL Scripting"},{"id":178,"type":"Skill","name":"PHP"},{"id":49,"type":"Skill","name":"Power BI"},{"id":4,"type":"Skill","name":"Python"},{"id":171,"type":"Skill","name":"QA"},{"id":170,"type":"Skill","name":"QA Automation"},{"id":152,"type":"Skill","name":"Qa test"},{"id":22,"type":"Skill","name":"Qlikview"},{"id":84,"type":"Skill","name":"QTP"},{"id":159,"type":"Skill","name":"React JS"},{"id":177,"type":"Skill","name":"RPA (Robotic Process Automation)"},{"id":155,"type":"Skill","name":"Sales and Marketing"},{"id":6,"type":"Skill","name":"Salesforce"},{"id":157,"type":"Skill","name":"SAP"},{"id":79,"type":"Skill","name":"SAP - Functional"},{"id":80,"type":"Skill","name":"SAP - Technical"},{"id":128,"type":"Skill","name":"SAP BW"},{"id":83,"type":"Skill","name":"SAP Hybris"},{"id":32,"type":"Skill","name":"SAS"},{"id":85,"type":"Skill","name":"Selenium"},{"id":153,"type":"Skill","name":"Selenium Testing Using Cucumber"},{"id":56,"type":"Skill","name":"Sharepoint"},{"id":101,"type":"Skill","name":"SOAP Services"},{"id":47,"type":"Skill","name":"SSAS(Analysis Services)"},{"id":45,"type":"Skill","name":"SSIS(Integration Services)"},{"id":46,"type":"Skill","name":"SSRS(Reporting Services)"},{"id":147,"type":"Skill","name":"swd"},{"id":23,"type":"Skill","name":"Tableau"},{"id":65,"type":"Skill","name":"Testing"},{"id":156,"type":"Skill","name":"Tibco"},{"id":90,"type":"Skill","name":"Tibco Administator"},{"id":88,"type":"Skill","name":"Tibco BW"},{"id":89,"type":"Skill","name":"Tibco Developer"},{"id":29,"type":"Skill","name":"TM2"},{"id":95,"type":"Skill","name":"UFT"},{"id":14,"type":"Skill","name":"UX / UI Designer"},{"id":179,"type":"Skill","name":"UX designer"},{"id":53,"type":"Skill","name":"VBScript"},{"id":169,"type":"Skill","name":"Visual Android"},{"id":58,"type":"Skill","name":"Visual Studio"},{"id":57,"type":"Skill","name":"WCF"},{"id":15,"type":"Skill","name":"Web Desginer"},{"id":61,"type":"Skill","name":"Windows"},{"id":9,"type":"Skill","name":"Workday"}];

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    public dataStorage: DataStorageService) {
    this.router.events
      .pipe(filter((event) => {
        if (event instanceof NavigationEnd) {
          this.url = event.url;
        }
        return event instanceof NavigationEnd
      }))
      .pipe(map(() => this.activatedRoute))
      .pipe(map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }))
      .pipe(filter(route => route.outlet === PRIMARY_OUTLET))
      .subscribe(event => {
        // debugger;
        let title = event.snapshot.data['title'];
        let parent = event.parent.snapshot.data['breadcrumb'];
        let child = event.snapshot.data['breadcrumb'];
        this.path = event.snapshot.data['path'];
        this.breadcrumbs = {};
        this.title = title;
        this.breadcrumbs = {
          "parentBreadcrumb": parent,
          "childBreadcrumb": child
        }
      });
  }

  ngOnInit() {
    Object.values(this.dataStorage.globalPathInformation).forEach(value => {
      if(value.PATH == this.path.PATH) {
        this.pageName = value.PAGE_NAME;
      }
    })
  }

}
