import {
  UserService
} from "./chunk-XHC6Z6VP.js";
import {
  RouterLink
} from "./chunk-RBSBLNYF.js";
import {
  Component,
  NgClass,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-2HB4LNL5.js";

// src/app/pages/users/users-list.component.ts
var _c0 = (a0) => ["/users/edit", a0];
var _forTrack0 = ($index, $item) => $item.id;
function UsersListComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275element(1, "span", 9);
    \u0275\u0275elementEnd();
  }
}
function UsersListComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error);
  }
}
function UsersListComponent_Conditional_9_For_15_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275text(1, "Active");
    \u0275\u0275elementEnd();
  }
}
function UsersListComponent_Conditional_9_For_15_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 12);
    \u0275\u0275text(1, "Inactive");
    \u0275\u0275elementEnd();
  }
}
function UsersListComponent_Conditional_9_For_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td")(6, "span", 10);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275conditionalCreate(9, UsersListComponent_Conditional_9_For_15_Conditional_9_Template, 2, 0, "span", 11)(10, UsersListComponent_Conditional_9_For_15_Conditional_10_Template, 2, 0, "span", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td")(12, "a", 13);
    \u0275\u0275element(13, "i", 14);
    \u0275\u0275text(14, " Edit ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 15);
    \u0275\u0275listener("click", function UsersListComponent_Conditional_9_For_15_Template_button_click_15_listener() {
      const user_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.delete(user_r3.id));
    });
    \u0275\u0275element(16, "i", 16);
    \u0275\u0275text(17, " Delete ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const user_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r3.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r3.email);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r0.roleBadge(user_r3.role));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(user_r3.role || "Client");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(user_r3.active ? 9 : 10);
    \u0275\u0275advance(3);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(6, _c0, user_r3.id));
  }
}
function UsersListComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 8)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Role");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Active");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th");
    \u0275\u0275text(12, "Actions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "tbody");
    \u0275\u0275repeaterCreate(14, UsersListComponent_Conditional_9_For_15_Template, 18, 8, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(14);
    \u0275\u0275repeater(ctx_r0.users);
  }
}
var UsersListComponent = class _UsersListComponent {
  users = [];
  loading = true;
  error = "";
  userService = inject(UserService);
  ngOnInit() {
    this.load();
  }
  ngAfterViewInit() {
    this.initDataTable();
  }
  load() {
    this.loading = true;
    this.userService.getAll().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
        setTimeout(() => this.initDataTable(), 0);
      },
      error: () => {
        this.error = "Failed to load users.";
        this.loading = false;
      }
    });
  }
  delete(id) {
    if (!confirm("Delete this user?"))
      return;
    this.userService.delete(id).subscribe({
      next: () => this.load(),
      error: () => alert("Failed to delete user.")
    });
  }
  roleBadge(role) {
    switch (role) {
      case "Admin":
        return "badge-danger";
      case "Warehouse":
        return "badge-warning";
      default:
        return "badge-info";
    }
  }
  initDataTable() {
    if (typeof $ === "undefined")
      return;
    const table = $("#usersTable");
    if (table.length && !$.fn.DataTable.isDataTable("#usersTable")) {
      table.DataTable({
        pagingType: "full_numbers",
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
        responsive: true,
        language: { search: "_INPUT_", searchPlaceholder: "Search users" }
      });
    }
  }
  static \u0275fac = function UsersListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UsersListComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UsersListComponent, selectors: [["app-users-list"]], decls: 10, vars: 1, consts: [[1, "row"], [1, "col-12"], [1, "card"], [1, "card-header"], [1, "card-title"], [1, "card-body"], [1, "text-center", "py-3"], [1, "alert", "alert-danger"], ["id", "usersTable", 1, "table", "table-bordered", "table-striped"], [1, "spinner-border", "text-primary"], [1, "badge", 3, "ngClass"], [1, "badge", "badge-success"], [1, "badge", "badge-secondary"], [1, "btn", "btn-warning", "btn-xs", 3, "routerLink"], [1, "fas", "fa-edit"], [1, "btn", "btn-danger", "btn-xs", "ml-1", 3, "click"], [1, "fas", "fa-trash"]], template: function UsersListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h3", 4);
      \u0275\u0275text(5, "Users");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 5);
      \u0275\u0275conditionalCreate(7, UsersListComponent_Conditional_7_Template, 2, 0, "div", 6)(8, UsersListComponent_Conditional_8_Template, 2, 1, "div", 7)(9, UsersListComponent_Conditional_9_Template, 16, 0, "table", 8);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.loading ? 7 : ctx.error ? 8 : 9);
    }
  }, dependencies: [RouterLink, NgClass], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UsersListComponent, [{
    type: Component,
    args: [{ selector: "app-users-list", standalone: true, imports: [RouterLink, NgClass], template: `<div class="row">
  <div class="col-12">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Users</h3>
      </div>
      <div class="card-body">
        @if (loading) {
          <div class="text-center py-3"><span class="spinner-border text-primary"></span></div>
        } @else if (error) {
          <div class="alert alert-danger">{{ error }}</div>
        } @else {
          <table id="usersTable" class="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (user of users; track user.id) {
                <tr>
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td><span class="badge" [ngClass]="roleBadge(user.role)">{{ user.role || 'Client' }}</span></td>
                  <td>
                    @if (user.active) {
                      <span class="badge badge-success">Active</span>
                    } @else {
                      <span class="badge badge-secondary">Inactive</span>
                    }
                  </td>
                  <td>
                    <a [routerLink]="['/users/edit', user.id]" class="btn btn-warning btn-xs">
                      <i class="fas fa-edit"></i> Edit
                    </a>
                    <button class="btn btn-danger btn-xs ml-1" (click)="delete(user.id)">
                      <i class="fas fa-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        }
      </div>
    </div>
  </div>
</div>
` }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UsersListComponent, { className: "UsersListComponent", filePath: "app/pages/users/users-list.component.ts", lineNumber: 14 });
})();
export {
  UsersListComponent
};
//# sourceMappingURL=chunk-LBDYF4QE.js.map
