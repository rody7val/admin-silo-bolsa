angular.module('app.templates', []).run(['$templateCache', function($templateCache) {
  "use strict";
  $templateCache.put("frontend/templates/404.html",
    "<section id=template-content class=\"{{loading ? &quot;load&quot; : &quot;&quot;}}\"><section id=img-load-content class=\"{{loading ? &quot;view&quot; : &quot;&quot;}}\"><img id=img-load src=img/img-load.gif alt=img-load.gif></section><div class=head-title></div><div class=container><div class=jumbotron><div class=row><div class=col-md-7><h1 class=display-3>Error 404</h1><p class=lead>Esta página no existe :(</p><p class=lead><a class=\"center btn btn-primary\" href=\"/\">Volver</a></p><hr class=my-4></div><div class=col-md-5><img style=\"margin:0 auto\" class=img-fluid src=/img/troll.gif></div></div></div></div></section>");
  $templateCache.put("frontend/templates/excel/index.html",
    "<section id=template-content class=\"{{loading ? &quot;load&quot; : &quot;&quot;}}\"><section id=img-load-content class=\"{{loading ? &quot;view&quot; : &quot;&quot;}}\"><img id=img-load src=img/img-load.gif alt=img-load.gif></section><div ng-show=!parent.isAuthenticated()><br><p class=center>Tu sesión expiró. <a href=/login style=cursor:pointer>Inicia Sesión</a>.</p></div><div class=col-lg-6><div class=body-form ng-show=parent.isAuthenticated()><h4 class=date>EXPORTAR DATOS A EXCEL</h4><div ng-show=feedback_err class=\"alert alert-danger\"><button type=button class=close ng-click=quit()><span>&times;</span></button> {{feedback_err}}</div><div ng-show=feedback_success class=\"alert alert-success\"><button type=button class=close ng-click=quit()><span>&times;</span></button> {{feedback_success}}</div><form ng-submit=export()><label class=col-form-label><b>Día</b></label><input class=form-control type=date ng-model=data.date_false ng-change=formatDate() required> <button type=submit class=\"btn btn-success\">Descargar hoja de cácluclo!</button></form><div class=\"alert alert-info alert-form\" ng-show=\"sectors.length == 0\" style=\"margin-bottom: 0px\"><small>Aún no hay sectores. <a href=/sectors>Crea uno</a></small></div></div></div></section>");
  $templateCache.put("frontend/templates/index.html",
    "<section id=template-content class=\"{{loading ? &quot;load&quot; : &quot;&quot;}}\"><section id=img-load-content class=\"{{loading ? &quot;view&quot; : &quot;&quot;}}\"><img id=img-load src=img/img-load.gif alt=img-load.gif></section><div class=\"notifications container center\"><div ng-show=feedback_err class=\"alert alert-danger\">{{feedback_err}}<script>(function(e){function animation(element){setTimeout(function(){element.animate({height:'0px'},'slow');e.empty()},5000)}animation(e)})($('.notifications'))</script></div><div ng-show=feedback_success class=\"alert alert-success\">{{feedback_success}}<script>(function(e){function animation(element){setTimeout(function(){element.animate({height:'0px'},'slow');e.empty()},5000)}animation(e)})($('.notifications'))</script></div></div><div ng-show=!parent.isAuthenticated()><br><p class=center>Tu sesión expiró. <a href=/login style=cursor:pointer>Inicia Sesión</a>.</p></div><div class=row ng-show=parent.isAuthenticated()><div class=col-lg-4><div class=col-lg-12><div class=body-form><h4 class=\"center date\">USUARIOS</h4><h1 class=center>{{parent.usersCount}}</h1></div></div></div><div class=col-lg-8><div class=body-form><h4 class=\"center date\">Temp. y Humedad Exterior</h4><div class=card-content ng-show=parent.dht22><b>T:</b> {{parent.dht22.data.temperature.toFixed(1)}}°C<br><b>H:</b> {{parent.dht22.data.humidity.toFixed(1)}}%</div></div></div></div></section>");
  $templateCache.put("frontend/templates/session/forgot.html",
    "<section id=template-content class=\"{{loading ? &quot;load&quot; : &quot;&quot;}}\"><section id=img-load-content class=\"{{loading ? &quot;view&quot; : &quot;&quot;}}\"><img id=img-load src=img/img-load.gif alt=img-load.gif></section><div class=\"container body-form auth-form\"><form ng-submit=forgot.forgot() method=post><div ng-show=feedback_err class=\"alert alert-danger\">{{feedback_err}}</div><div ng-show=feedback_success class=\"alert alert-success\">{{feedback_success}}</div><div class=\"form-group {{feedback_email ? &quot;has-danger&quot; : &quot;&quot;}}\"><label class=form-control-label for=email><b>Ingresa tu Email</b></label><input id=email type=email ng-model=forgot.email class=\"form-control\"><div id=email-feedback class=form-control-feedback>{{feedback_email}}</div></div><button type=submit class=\"btn btn-outline-primary {{loading ? &quot;disabled&quot; : &quot;&quot;}}\">Recuperar Contraseña</button> <a class=\"btn btn-link right\" href=/login>Volver</a></form></div></section>");
  $templateCache.put("frontend/templates/session/login.html",
    "<section id=template-content class=\"{{loading ? &quot;load&quot; : &quot;&quot;}}\"><section id=img-load-content class=\"{{loading ? &quot;view&quot; : &quot;&quot;}}\"><img id=img-load src=img/img-load.gif alt=img-load.gif></section><div class=\"container body-form auth-form\"><form ng-submit=login.login() method=post><div ng-show=\"feedback_err || parent.errConect\" class=\"alert alert-danger\">{{feedback_err || 'Error de servicio! Contácte al administrdor del sistema.'}}</div><div class=\"form-group {{feedback_email ? &quot;has-danger&quot; : &quot;&quot;}}\"><label class=form-control-label for=email><b>Email</b></label><input id=email type=email ng-model=login.email class=\"form-control\"><div id=email-feedback class=form-control-feedback>{{feedback_email}}</div></div><div class=\"form-group {{feedback_password ? &quot;has-danger&quot; : &quot;&quot;}}\"><label class=form-control-label for=password><b>Contraseña</b></label><input id=password type=password ng-model=login.password class=\"form-control\"><div id=password-feedback class=form-control-feedback>{{feedback_password}}</div></div><button type=submit class=\"btn btn-outline-primary {{loading ? &quot;disabled&quot; : &quot;&quot;}}\">Autenticarse</button> <a class=\"btn btn-link right\" href=/forgot>Perdiste la contraseña?</a></form></div></section>");
  $templateCache.put("frontend/templates/session/reset.html",
    "<section id=template-content class=\"{{loading ? &quot;load&quot; : &quot;&quot;}}\"><section id=img-load-content class=\"{{loading ? &quot;view&quot; : &quot;&quot;}}\"><img id=img-load src=img/img-load.gif alt=img-load.gif></section><div class=head-title><h4 class=\"center light\">Restablecer Contraseña para {{user_reset.email || \"cargando..\"}}</h4></div><div class=\"container body-form auth-form\"><form ng-submit=reset.reset() method=post><fieldset><div ng-show=feedback_err class=\"alert alert-danger\">{{feedback_err}}</div><div ng-show=feedback_success class=\"alert alert-success\">{{feedback_success}}</div><div class=\"form-group {{feedback_password ? &quot;has-danger&quot; : &quot;&quot;}}\"><label class=form-control-label for=password><b>Nueva Contraseña</b></label><input id=password type=password ng-model=reset.password required class=\"form-control\"></div><div class=\"form-group {{feedback_password_bis ? &quot;has-danger&quot; : &quot;&quot;}}\"><label class=form-control-label for=password><b>Repetir Contraseña</b></label><input id=password-bis type=password ng-model=reset.password_bis required class=\"form-control\"></div><button type=submit class=\"btn btn-outline-primary {{loading ? &quot;disabled&quot; : &quot;&quot;}}\">Actualizar Contraseña</button></fieldset></form></div></section>");
  $templateCache.put("frontend/templates/session/signup.html",
    "<section id=template-content class=\"{{loading ? &quot;load&quot; : &quot;&quot;}}\"><section id=img-load-content class=\"{{loading ? &quot;view&quot; : &quot;&quot;}}\"><img id=img-load src=img/img-load.gif alt=img-load.gif></section><div class=\"container body-form auth-form\"><form ng-submit=signup.signup() method=post><div ng-show=feedback_err class=\"alert alert-danger\">{{feedback_err}}</div><div class=\"form-group {{feedback_name ? &quot;has-danger&quot; : &quot;&quot;}}\"><label class=form-control-label for=name><b>Nombre Completo</b></label><input id=name type=name ng-model=signup.name class=\"form-control\"><div id=name-feedback class=form-control-feedback>{{feedback_name}}</div></div><div class=\"form-group {{feedback_email ? &quot;has-danger&quot; : &quot;&quot;}}\"><label class=form-control-label for=email><b>Email</b></label><input id=email type=email ng-model=signup.email class=\"form-control\"><div id=email-feedback class=form-control-feedback>{{feedback_email}}</div></div><div class=\"form-group {{feedback_password ? &quot;has-danger&quot; : &quot;&quot;}}\"><label class=form-control-label for=password><b>Contraseña</b></label><input id=password type=password ng-model=signup.password class=\"form-control\"><div id=password-feedback class=form-control-feedback>{{feedback_password}}</div></div><div class=none><input id=super-admin type=checkbox ng-model=signup.admin class=\"form-control\"> <input id=active type=checkbox ng-model=signup.active class=\"form-control\"></div><button type=submit class=\"btn btn-outline-primary {{loading ? &quot;disabled&quot; : &quot;&quot;}}\">Registrarse</button></form></div></section>");
  $templateCache.put("frontend/templates/user/list.html",
    "<section id=template-content class=\"{{loading ? &quot;load&quot; : &quot;&quot;}}\"><section id=img-load-content class=\"{{loading ? &quot;view&quot; : &quot;&quot;}}\"><img id=img-load src=img/img-load.gif alt=img-load.gif></section><div ng-show=!parent.isAuthenticated()><br><p class=center>Tu sesión expiró. <a href=/login style=cursor:pointer>Inicia Sesión</a>.</p></div><div class=\"container body-form\" ng-show=parent.isAuthenticated()><div ng-show=feedback_err class=\"alert alert-danger\">{{feedback_err}}</div><h5>Listado de usuarios:</h5><table class=\"table table-hover\"><thead><tr><th>Nombre</th><th>Email</th><th>Estado</th><th ng-if=userLoged.active>Acciones</th></tr></thead><tbody><tr ng-if=users.length ng-repeat=\"user in users\"><td class=date>{{user.name}}</td><td>{{user.email}}</td><td class=\"{{user.active == false ? 'alert-danger' : 'alert-success'}}\">{{user.active == false ? 'Pendiente' : 'Activo'}}</td><td ng-if=\"userLoged.active && user._id != userLoged._id\"><form ng-submit=this.delete(user._id)><input class=\"btn btn-outline-danger btn-sm\" type=submit onclick=\"return confirm(&quot;BORRAR USUARIO?&quot;)\" value=Borrar></form><form ng-if=!user.active ng-submit=this.activate(user._id)><input class=\"btn btn-outline-success btn-sm\" type=submit value=Activar></form><form ng-if=\"user.active && user._id != userLoged._id\" ng-submit=this.block(user._id)><input class=\"btn btn-outline-warning btn-sm\" type=submit value=Bloquear></form></td></tr><tr ng-if=!users.length><td colspan=4 class=center>No hay usuarios ...</td></tr></tbody></table><a href=\"/\" class=\"btn btn-link\">Volver</a></div></section>");
}]);
