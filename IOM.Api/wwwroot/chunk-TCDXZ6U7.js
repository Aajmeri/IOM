import {
  BasketService
} from "./chunk-XWUJ5W22.js";
import {
  AuthService
} from "./chunk-JU3C6OAJ.js";
import {
  CheckboxControlValueAccessor,
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

// src/app/pages/login/login.component.ts
function LoginComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "button", 25)(2, "span");
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
function LoginComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 22);
  }
}
var LoginComponent = class _LoginComponent {
  email = "";
  password = "";
  rememberMe = false;
  error = "";
  loading = false;
  auth = inject(AuthService);
  router = inject(Router);
  basket = inject(BasketService);
  submit() {
    this.error = "";
    this.loading = true;
    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        this.basket.reset();
        this.router.navigate([this.auth.isClient() ? "/shop" : "/products"]);
      },
      error: (err) => {
        this.error = err.error?.message ?? "Invalid email or password.";
        this.loading = false;
      }
    });
  }
  static \u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoginComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], decls: 35, vars: 6, consts: [["f", "ngForm"], [1, "login-box"], [1, "login-logo"], [1, "card"], [1, "card-body", "login-card-body"], [1, "login-box-msg"], [1, "alert", "alert-danger", "alert-dismissible", "fade", "show"], [3, "ngSubmit"], [1, "input-group", "mb-3"], ["type", "email", "placeholder", "Email", "name", "email", "required", "", "autofocus", "", "autocomplete", "email", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "input-group-append"], [1, "input-group-text"], [1, "fas", "fa-envelope"], ["type", "password", "placeholder", "Password", "name", "password", "required", "", "autocomplete", "current-password", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "fas", "fa-lock"], [1, "row"], [1, "col-8", "d-flex", "align-items-center"], [1, "icheck-primary"], ["type", "checkbox", "id", "remember", "name", "rememberMe", 3, "ngModelChange", "ngModel"], ["for", "remember"], [1, "col-4"], ["type", "submit", 1, "btn", "btn-primary", "btn-block", 3, "disabled"], [1, "spinner-border", "spinner-border-sm", "mr-1"], [1, "mt-3", "mb-0", "text-center"], ["routerLink", "/register"], ["type", "button", "data-dismiss", "alert", 1, "close"]], template: function LoginComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "b");
      \u0275\u0275text(3, "Royal");
      \u0275\u0275elementEnd();
      \u0275\u0275text(4, " Distributors ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 3)(6, "div", 4)(7, "p", 5);
      \u0275\u0275text(8, "Sign in to start your session");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(9, LoginComponent_Conditional_9_Template, 5, 1, "div", 6);
      \u0275\u0275elementStart(10, "form", 7, 0);
      \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_10_listener() {
        return ctx.submit();
      });
      \u0275\u0275elementStart(12, "div", 8)(13, "input", 9);
      \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_13_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.email, $event) || (ctx.email = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "div", 10)(15, "div", 11);
      \u0275\u0275element(16, "span", 12);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(17, "div", 8)(18, "input", 13);
      \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_18_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.password, $event) || (ctx.password = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "div", 10)(20, "div", 11);
      \u0275\u0275element(21, "span", 14);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(22, "div", 15)(23, "div", 16)(24, "div", 17)(25, "input", 18);
      \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_25_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.rememberMe, $event) || (ctx.rememberMe = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "label", 19);
      \u0275\u0275text(27, "Remember Me");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(28, "div", 20)(29, "button", 21);
      \u0275\u0275conditionalCreate(30, LoginComponent_Conditional_30_Template, 1, 0, "span", 22);
      \u0275\u0275text(31, " Sign In ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(32, "p", 23)(33, "a", 24);
      \u0275\u0275text(34, "Create an account");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275conditional(ctx.error ? 9 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.email);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.password);
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.rememberMe);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading ? 30 : -1);
    }
  }, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, RouterLink], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginComponent, [{
    type: Component,
    args: [{ selector: "app-login", standalone: true, imports: [FormsModule, RouterLink], template: '<div class="login-box">\n  <div class="login-logo">\n    <b>Royal</b> Distributors\n  </div>\n  <div class="card">\n    <div class="card-body login-card-body">\n      <p class="login-box-msg">Sign in to start your session</p>\n\n      @if (error) {\n        <div class="alert alert-danger alert-dismissible fade show">\n          <button type="button" class="close" data-dismiss="alert"><span>&times;</span></button>\n          {{ error }}\n        </div>\n      }\n\n      <form (ngSubmit)="submit()" #f="ngForm">\n        <div class="input-group mb-3">\n          <input type="email" class="form-control" placeholder="Email"\n                 [(ngModel)]="email" name="email" required autofocus autocomplete="email">\n          <div class="input-group-append">\n            <div class="input-group-text"><span class="fas fa-envelope"></span></div>\n          </div>\n        </div>\n\n        <div class="input-group mb-3">\n          <input type="password" class="form-control" placeholder="Password"\n                 [(ngModel)]="password" name="password" required autocomplete="current-password">\n          <div class="input-group-append">\n            <div class="input-group-text"><span class="fas fa-lock"></span></div>\n          </div>\n        </div>\n\n        <div class="row">\n          <div class="col-8 d-flex align-items-center">\n            <div class="icheck-primary">\n              <input type="checkbox" id="remember" [(ngModel)]="rememberMe" name="rememberMe">\n              <label for="remember">Remember Me</label>\n            </div>\n          </div>\n          <div class="col-4">\n            <button type="submit" class="btn btn-primary btn-block" [disabled]="loading">\n              @if (loading) { <span class="spinner-border spinner-border-sm mr-1"></span> }\n              Sign In\n            </button>\n          </div>\n        </div>\n      </form>\n\n      <p class="mt-3 mb-0 text-center">\n        <a routerLink="/register">Create an account</a>\n      </p>\n    </div>\n  </div>\n</div>\n' }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "app/pages/login/login.component.ts", lineNumber: 13 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-TCDXZ6U7.js.map
