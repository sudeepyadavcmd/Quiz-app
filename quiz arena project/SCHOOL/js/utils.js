// utils.js - small helpers
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));
const save = (k,v) => localStorage.setItem(k, v);
const get = k => localStorage.getItem(k);
const on = (el, ev, fn) => el && el.addEventListener(ev, fn);
const create = (tag, attrs={}, text="") => { const e=document.createElement(tag); for(const k in attrs) e.setAttribute(k, attrs[k]); if(text) e.textContent=text; return e; };
const clamp = (n,min,max)=> Math.max(min, Math.min(max,n));
const shuffle = a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
