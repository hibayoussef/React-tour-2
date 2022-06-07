import AcademyAppConfig from "./academy/AcademyAppConfig";
import CalendarAppConfig from "./calendar/CalendarAppConfig";
import ChatAppConfig from "./chat/ChatAppConfig";
import ContactsAppConfig from "./contacts/ContactsAppConfig";
import AnalyticsDashboardAppConfig from "./dashboards/analytics/AnalyticsDashboardAppConfig";
import ProjectDashboardAppConfig from "./dashboards/project/ProjectDashboardAppConfig";
import ReceiptsAppConfig from "./receipts/ReceiptsAppConfig";
import ReceiptsHrManagerAppConfig from "./receipt-hr-manager/ReceiptsHrManagerAppConfig";
import ReceiptsUserAppConfig from "./receipts-user/ReceiptsUserAppConfig";
import FileManagerAppConfig from "./file-manager/FileManagerAppConfig";
import MailAppConfig from "./mail/MailAppConfig";
import NotesAppConfig from "./notes/NotesAppConfig";
import ScrumboardAppConfig from "./scrumboard/ScrumboardAppConfig";
import TodoAppConfig from "./todo/TodoAppConfig";
import UsersAppConfig from "./users/UsersAppConfig";
// import JobsAppConfig from "./jobs/JobsAppConfig";
import SalaryScalesHrAndManagerAppConfig from "./salary-scales-hr-and-manager/SalaryScalesAppConfig";
import SalaryScalesAppConfig from "./salary-scales/SalaryScalesAppConfig";
import InvoicesAppConfig from "./invoices/InvoicesAppConfig";
import LeavesAppConfig from "./leaves/LeavesAppConfig";
import DepartementsAppConfig from "./departements/DepartementAppConfig";
import WorksAppConfig from './jobs/WorksAppConfig';
import WorksHrAndManagerAppConfig from './jobs-hr-and-manager/WorksAppConfig'
import CategoriesAppConfig from './leave-categories/CategoriesAppConfig';


const appsConfigs = [
  AnalyticsDashboardAppConfig,
  ProjectDashboardAppConfig,
  MailAppConfig,
  TodoAppConfig,
  FileManagerAppConfig,
  ContactsAppConfig,
  UsersAppConfig,
  WorksAppConfig,
  WorksHrAndManagerAppConfig,
  CalendarAppConfig,
  ChatAppConfig,
  ReceiptsHrManagerAppConfig,
  ReceiptsAppConfig,
  ReceiptsUserAppConfig,
  ScrumboardAppConfig,
  AcademyAppConfig,
  NotesAppConfig,
  // JobsAppConfig,
  SalaryScalesAppConfig,
  SalaryScalesHrAndManagerAppConfig,
  InvoicesAppConfig,
  LeavesAppConfig,
  CategoriesAppConfig,
  DepartementsAppConfig,
];

export default appsConfigs;
