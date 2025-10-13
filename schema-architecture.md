# Summary of Architecture Design
The project uses Spring MVC and REST API Controllers. The View part displays the admin, doctor and, user dashboards and this is what the users see and interact with this is displayed using Thymeleaf templates.
The controller receives user requests and passes them to the model, which fetches/updates data according to the request.

# Request - Response Cycle
1) Users access the system using their respective dashboards.
2) The user request is routed to the backend controller.
3) Business rules and logic/validation are applied according to the request
4) Database repositories are accessed to perform data access operations.
5) Repositories access the database.
6) Data is retrieved and is mapped to model Java classes.
7) Bound models are passed to the response layer where they are mapped to thymeleaf templates or they are serialized into JSON.
