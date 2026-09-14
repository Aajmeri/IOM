import {
  UserService
} from "./chunk-XHC6Z6VP.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  RequiredValidator,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-TZCII4RM.js";
import {
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-RBSBLNYF.js";
import {
  Component,
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-2HB4LNL5.js";

// src/app/pages/users/user-edit.component.ts
function UserEditComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "span", 8);
    \u0275\u0275elementEnd();
  }
}
function UserEditComponent_Conditional_8_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.error);
  }
}
function UserEditComponent_Conditional_8_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const role_r3 = ctx.$implicit;
    \u0275\u0275property("value", role_r3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(role_r3);
  }
}
function UserEditComponent_Conditional_8_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 20);
  }
}
function UserEditComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275conditionalCreate(0, UserEditComponent_Conditional_8_Conditional_0_Template, 2, 1, "div", 9);
    \u0275\u0275elementStart(1, "form", 10, 0);
    \u0275\u0275listener("ngSubmit", function UserEditComponent_Conditional_8_Template_form_ngSubmit_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submit());
    });
    \u0275\u0275elementStart(3, "div", 11)(4, "label");
    \u0275\u0275text(5, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "input", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 11)(8, "label");
    \u0275\u0275text(9, "Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "input", 13);
    \u0275\u0275twoWayListener("ngModelChange", function UserEditComponent_Conditional_8_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.model.name, $event) || (ctx_r1.model.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 11)(12, "label");
    \u0275\u0275text(13, "Role");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "select", 14);
    \u0275\u0275twoWayListener("ngModelChange", function UserEditComponent_Conditional_8_Template_select_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.model.role, $event) || (ctx_r1.model.role = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275repeaterCreate(15, UserEditComponent_Conditional_8_For_16_Template, 2, 2, "option", 15, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 11)(18, "div", 16)(19, "input", 17);
    \u0275\u0275twoWayListener("ngModelChange", function UserEditComponent_Conditional_8_Template_input_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.model.active, $event) || (ctx_r1.model.active = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "label", 18);
    \u0275\u0275text(21, "Active");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "button", 19);
    \u0275\u0275conditionalCreate(23, UserEditComponent_Conditional_8_Conditional_23_Template, 1, 0, "span", 20);
    \u0275\u0275text(24, " Save ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "a", 21);
    \u0275\u0275text(26, "Cancel");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.error ? 0 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275property("value", ctx_r1.email);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.model.name);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.model.role);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.roles);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.model.active);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.saving);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.saving ? 23 : -1);
  }
}
var UserEditComponent = class _UserEditComponent {
  userId = "";
  email = "";
  model = { name: "", role: "Client", active: true };
  error = "";
  loading = false;
  saving = false;
  roles = ["Admin", "Warehouse", "Client"];
  route = inject(ActivatedRoute);
  router = inject(Router);
  userService = inject(UserService);
  ngOnInit() {
    this.userId = this.route.snapshot.params["id"];
    this.loading = true;
    this.userService.getById(this.userId).subscribe({
      next: (u) => {
        this.email = u.email;
        this.model = { name: u.name, role: u.role ?? "Client", active: u.active };
        this.loading = false;
      },
      error: () => {
        this.error = "User not found.";
        this.loading = false;
      }
    });
  }
  submit() {
    this.error = "";
    this.saving = true;
    this.userService.update(this.userId, this.model).subscribe({
      next: () => this.router.navigate(["/users"]),
      error: (err) => {
        this.error = err.error?.message ?? "Failed to save user.";
        this.saving = false;
      }
    });
  }
  static \u0275fac = function UserEditComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UserEditComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UserEditComponent, selectors: [["app-user-edit"]], decls: 9, vars: 1, consts: [["f", "ngForm"], [1, "row", "justify-content-center"], [1, "col-md-6"], [1, "card"], [1, "card-header"], [1, "card-title"], [1, "card-body"], [1, "text-center", "py-3"], [1, "spinner-border", "text-primary"], [1, "alert", "alert-danger"], [3, "ngSubmit"], [1, "form-group"], ["type", "text", "disabled", "", 1, "form-control", 3, "value"], ["type", "text", "name", "name", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], ["name", "role", "required", "", 1, "form-control", 3, "ngModelChange", "ngModel"], [3, "value"], [1, "custom-control", "custom-switch"], ["type", "checkbox", "id", "active", "name", "active", 1, "custom-control-input", 3, "ngModelChange", "ngModel"], ["for", "active", 1, "custom-control-label"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "spinner-border", "spinner-border-sm", "mr-1"], ["routerLink", "/users", 1, "btn", "btn-secondary", "ml-2"]], template: function UserEditComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "h3", 5);
      \u0275\u0275text(5, "Edit User");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 6);
      \u0275\u0275conditionalCreate(7, UserEditComponent_Conditional_7_Template, 2, 0, "div", 7)(8, UserEditComponent_Conditional_8_Template, 27, 7);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.loading ? 7 : 8);
    }
  }, dependencies: [FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, RouterLink], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserEditComponent, [{
    type: Component,
    args: [{ selector: "app-user-edit", standalone: true, imports: [FormsModule, RouterLink], template: '<div class="row justify-content-center">\n  <div class="col-md-6">\n    <div class="card">\n      <div class="card-header">\n        <h3 class="card-title">Edit User</h3>\n      </div>\n      <div class="card-body">\n        @if (loading) {\n          <div class="text-center py-3"><span class="spinner-border text-primary"></span></div>\n        } @else {\n          @if (error) {\n            <div class="alert alert-danger">{{ error }}</div>\n          }\n          <form (ngSubmit)="submit()" #f="ngForm">\n            <div class="form-group">\n              <label>Email</label>\n              <input type="text" class="form-control" [value]="email" disabled>\n            </div>\n            <div class="form-group">\n              <label>Name</label>\n              <input type="text" class="form-control" [(ngModel)]="model.name" name="name" required>\n            </div>\n            <div class="form-group">\n              <label>Role</label>\n              <select class="form-control" [(ngModel)]="model.role" name="role" required>\n                @for (role of roles; track role) {\n                  <option [value]="role">{{ role }}</option>\n                }\n              </select>\n            </div>\n            <div class="form-group">\n              <div class="custom-control custom-switch">\n                <input type="checkbox" class="custom-control-input" id="active"\n                       [(ngModel)]="model.active" name="active">\n                <label class="custom-control-label" for="active">Active</label>\n              </div>\n            </div>\n            <button type="submit" class="btn btn-primary" [disabled]="saving">\n              @if (saving) { <span class="spinner-border spinner-border-sm mr-1"></span> }\n              Save\n            </button>\n            <a routerLink="/users" class="btn btn-secondary ml-2">Cancel</a>\n          </form>\n        }\n      </div>\n    </div>\n  </div>\n</div>\n' }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UserEditComponent, { className: "UserEditComponent", filePath: "app/pages/users/user-edit.component.ts", lineNumber: 12 });
})();
export {
  UserEditComponent
};
//# sourceMappingURL=chunk-WYRCBZUK.js.map
