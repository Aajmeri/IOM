import {
  BasketService
} from "./chunk-XWUJ5W22.js";
import {
  AuthService
} from "./chunk-JU3C6OAJ.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-TZCII4RM.js";
import {
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-2HB4LNL5.js";

// src/app/pages/register/register.component.ts
function RegisterComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "button", 26)(2, "span");
    \u0275\u0275text(3, "\xD7");
    \u0275\u0275elementEnd()();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.error, " ");
  }
}
function RegisterComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 23);
  }
}
var RegisterComponent = class _RegisterComponent {
  name = "";
  email = "";
  password = "";
  confirmPassword = "";
  error = "";
  loading = false;
  auth = inject(AuthService);
  router = inject(Router);
  basket = inject(BasketService);
  submit() {
    this.error = "";
    if (this.password !== this.confirmPassword) {
      this.error = "Passwords do not match.";
      return;
    }
    this.loading = true;
    this.auth.register(this.name, this.email, this.password, this.confirmPassword).subscribe({
      next: () => {
        this.basket.reset();
        this.router.navigate([this.auth.isClient() ? "/shop" : "/products"]);
      },
      error: (err) => {
        this.error = err.error?.message ?? "Registration failed.";
        this.loading = false;
      }
    });
  }
  static \u0275fac = function RegisterComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RegisterComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RegisterComponent, selectors: [["app-register"]], decls: 41, vars: 7, consts: [["f", "ngForm"], [1, "register-box"], [1, "register-logo"], [1, "card"], [1, "card-body", "register-card-body"], [1, "login-box-msg"], [1, "alert", "alert-danger", "alert-dismissible", "fade", "show"], [3, "ngSubmit"], [1, "input-group", "mb-1"], ["type", "text", "placeholder", "Full Name", "name", "name", "required", "", "autofocus", "", "autocomplete", "name", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "input-group-append"], [1, "input-group-text"], [1, "fas", "fa-user"], [1, "input-group", "mb-1", "mt-2"], ["type", "email", "placeholder", "Email", "name", "email", "required", "", "autocomplete", "email", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "fas", "fa-envelope"], ["type", "password", "placeholder", "Password", "name", "password", "required", "", "autocomplete", "new-password", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "fas", "fa-lock"], [1, "input-group", "mb-3", "mt-2"], ["type", "password", "placeholder", "Confirm Password", "name", "confirmPassword", "required", "", "autocomplete", "new-password", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "row"], [1, "col-12"], ["type", "submit", 1, "btn", "btn-primary", "btn-block", 3, "disabled"], [1, "spinner-border", "spinner-border-sm", "mr-1"], [1, "mt-3", "mb-0", "text-center"], ["routerLink", "/login"], ["type", "button", "data-dismiss", "alert", 1, "close"]], template: function RegisterComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "b");
      \u0275\u0275text(3, "Royal");
      \u0275\u0275elementEnd();
      \u0275\u0275text(4, " Distributors ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 3)(6, "div", 4)(7, "p", 5);
      \u0275\u0275text(8, "Create a new account");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(9, RegisterComponent_Conditional_9_Template, 5, 1, "div", 6);
      \u0275\u0275elementStart(10, "form", 7, 0);
      \u0275\u0275listener("ngSubmit", function RegisterComponent_Template_form_ngSubmit_10_listener() {
        return ctx.submit();
      });
      \u0275\u0275elementStart(12, "div", 8)(13, "input", 9);
      \u0275\u0275twoWayListener("ngModelChange", function RegisterComponent_Template_input_ngModelChange_13_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.name, $event) || (ctx.name = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "div", 10)(15, "div", 11);
      \u0275\u0275element(16, "span", 12);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(17, "div", 13)(18, "input", 14);
      \u0275\u0275twoWayListener("ngModelChange", function RegisterComponent_Template_input_ngModelChange_18_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.email, $event) || (ctx.email = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "div", 10)(20, "div", 11);
      \u0275\u0275element(21, "span", 15);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(22, "div", 13)(23, "input", 16);
      \u0275\u0275twoWayListener("ngModelChange", function RegisterComponent_Template_input_ngModelChange_23_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.password, $event) || (ctx.password = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "div", 10)(25, "div", 11);
      \u0275\u0275element(26, "span", 17);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(27, "div", 18)(28, "input", 19);
      \u0275\u0275twoWayListener("ngModelChange", function RegisterComponent_Template_input_ngModelChange_28_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.confirmPassword, $event) || (ctx.confirmPassword = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "div", 10)(30, "div", 11);
      \u0275\u0275element(31, "span", 17);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(32, "div", 20)(33, "div", 21)(34, "button", 22);
      \u0275\u0275conditionalCreate(35, RegisterComponent_Conditional_35_Template, 1, 0, "span", 23);
      \u0275\u0275text(36, " Create Account ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(37, "p", 24);
      \u0275\u0275text(38, " Already have an account? ");
      \u0275\u0275elementStart(39, "a", 25);
      \u0275\u0275text(40, "Sign in");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275conditional(ctx.error ? 9 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.name);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.email);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.password);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.confirmPassword);
      \u0275\u0275advance(6);
      \u0275\u0275property("disabled", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading ? 35 : -1);
    }
  }, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, RouterLink], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RegisterComponent, [{
    type: Component,
    args: [{ selector: "app-register", standalone: true, imports: [FormsModule, RouterLink], template: '<div class="register-box">\n  <div class="register-logo">\n    <b>Royal</b> Distributors\n  </div>\n  <div class="card">\n    <div class="card-body register-card-body">\n      <p class="login-box-msg">Create a new account</p>\n\n      @if (error) {\n        <div class="alert alert-danger alert-dismissible fade show">\n          <button type="button" class="close" data-dismiss="alert"><span>&times;</span></button>\n          {{ error }}\n        </div>\n      }\n\n      <form (ngSubmit)="submit()" #f="ngForm">\n        <div class="input-group mb-1">\n          <input type="text" class="form-control" placeholder="Full Name"\n                 [(ngModel)]="name" name="name" required autofocus autocomplete="name">\n          <div class="input-group-append">\n            <div class="input-group-text"><span class="fas fa-user"></span></div>\n          </div>\n        </div>\n\n        <div class="input-group mb-1 mt-2">\n          <input type="email" class="form-control" placeholder="Email"\n                 [(ngModel)]="email" name="email" required autocomplete="email">\n          <div class="input-group-append">\n            <div class="input-group-text"><span class="fas fa-envelope"></span></div>\n          </div>\n        </div>\n\n        <div class="input-group mb-1 mt-2">\n          <input type="password" class="form-control" placeholder="Password"\n                 [(ngModel)]="password" name="password" required autocomplete="new-password">\n          <div class="input-group-append">\n            <div class="input-group-text"><span class="fas fa-lock"></span></div>\n          </div>\n        </div>\n\n        <div class="input-group mb-3 mt-2">\n          <input type="password" class="form-control" placeholder="Confirm Password"\n                 [(ngModel)]="confirmPassword" name="confirmPassword" required autocomplete="new-password">\n          <div class="input-group-append">\n            <div class="input-group-text"><span class="fas fa-lock"></span></div>\n          </div>\n        </div>\n\n        <div class="row">\n          <div class="col-12">\n            <button type="submit" class="btn btn-primary btn-block" [disabled]="loading">\n              @if (loading) { <span class="spinner-border spinner-border-sm mr-1"></span> }\n              Create Account\n            </button>\n          </div>\n        </div>\n      </form>\n\n      <p class="mt-3 mb-0 text-center">\n        Already have an account? <a routerLink="/login">Sign in</a>\n      </p>\n    </div>\n  </div>\n</div>\n' }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RegisterComponent, { className: "RegisterComponent", filePath: "app/pages/register/register.component.ts", lineNumber: 13 });
})();
export {
  RegisterComponent
};
//# sourceMappingURL=chunk-UZWX5C3Y.js.map
