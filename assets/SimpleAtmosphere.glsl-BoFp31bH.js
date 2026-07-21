import{c as e}from"./vec3f64-DIOQknMY.js";import{o as t}from"./vec2f64-IO40D2xB.js";import{t as n}from"./NoParameters-XZJ-8n06.js";import{t as r}from"./Float3PassUniform-YEiGS05C.js";import{n as i}from"./glsl-D85RBwKC.js";import{t as a}from"./Float3BindUniform-BmdF9XGj.js";import{t as o}from"./Matrix4BindUniform-DnHs9Hq_.js";import{t as s}from"./FloatPassUniform-DeUP8HjM.js";import{t as c}from"./Float2PassUniform-BYZ61_RB.js";import{t as l}from"./Texture2DPassUniform-CiCHIiok.js";import{t as u}from"./ShaderBuilder-8uuwgR05.js";import{t as d}from"./Transform.glsl-CM6cQEqg.js";import{r as f}from"./MainLighting.glsl-BzpgU6pB.js";var p=class extends n{constructor(){super(...arguments),this.texV=t(),this.altitudeFade=0,this.innerScale=0,this.undergroundFadeAlpha=0,this.silhouette=new m}},m=class{constructor(){this.center=e(),this.v1=e(),this.v2=e()}};function h(e){let t=new u,{vertex:n,fragment:p}=t;if(f(n),e.geometry===2)t.attributes.add(`position`,`vec2`),t.varyings.add(`color`,`vec4`),n.uniforms.add(new a(`cameraPosition`,e=>e.camera.eye),new s(`undergroundFadeAlpha`,e=>e.undergroundFadeAlpha)),n.main.add(i`float ndotl = dot(normalize(cameraPosition), mainLightDirection);
float lighting = max(0.0, smoothstep(-1.0, 0.8, 2.0 * ndotl));
color = vec4(vec3(lighting), undergroundFadeAlpha);
gl_Position = vec4(position.xy, 1.0, 1.0);`),p.main.add(i`fragColor = color;`);else{t.include(d),t.attributes.add(`position`,`vec3`),t.varyings.add(`vtc`,`vec2`),t.varyings.add(`falloff`,`float`);let a=e.geometry===1;n.uniforms.add(new o(`proj`,e=>e.camera.projectionMatrix),new o(`view`,e=>e.camera.viewMatrix)),a||(t.varyings.add(`innerFactor`,`float`),n.uniforms.add(new r(`silCircleCenter`,e=>e.silhouette.center),new r(`silCircleV1`,e=>e.silhouette.v1),new r(`silCircleV2`,e=>e.silhouette.v2),new c(`texV`,e=>e.texV),new s(`innerScale`,e=>e.innerScale)));let u=1/128;n.main.add(i`
      ${a?i`
      vec3 pos = position;
      float ndotl = mainLightDirection.z;
      vtc = vec2(0.0, position.z + 0.05);`:i`
      innerFactor = clamp(-position.z, 0.0, 1.0);
      float scale = position.y * (1.0 + innerFactor * innerScale);
      float phi = position.x * ${i.float(6.2831853*u)} + 1.0;
      vec3 pos =  (silCircleCenter + sin(phi) * silCircleV1 + cos(phi) * silCircleV2) * scale;
      float ndotl = dot(normalize(position.y > 0.0 ? pos: silCircleCenter), mainLightDirection);
      vtc.x = position.x  * ${i.float(u)};
      vtc.y = texV.x * (1.0 - position.z) + texV.y * position.z;
      `}
      falloff = max(0.0, smoothstep(-1.0, 0.8, 2.0 * ndotl));

		  gl_Position = transformPosition(proj, view, pos);
		  gl_Position.z = gl_Position.w; // project atmosphere onto the far plane
	  `),p.uniforms.add(new l(`tex`,e=>e.texture)),a||p.uniforms.add(new s(`altitudeFade`,e=>e.altitudeFade)),p.main.add(i`
			vec4 atmosphereColor = texture(tex, vtc) * falloff;
      ${a?i`fragColor = atmosphereColor;`:i`
              vec4 innerColor = vec4(atmosphereColor.rgb, 1.0 - altitudeFade);
              fragColor = mix(atmosphereColor, innerColor, smoothstep(0.0, 1.0, innerFactor));
            `}
    `)}return t}var g=Object.freeze(Object.defineProperty({__proto__:null,SilhouetteCircle:m,SimpleAtmospherePassParameters:p,build:h},Symbol.toStringTag,{value:`Module`}));export{g as i,h as n,m as r,p as t};