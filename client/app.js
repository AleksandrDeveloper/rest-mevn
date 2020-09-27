import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js";

Vue.component("loader", {
  template: `
      <div style="display: flex;justify-content: center;align-items: center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    `,
});

new Vue({
  el: "#app",
  data() {
    return {
      loading: false,
      form: {
        name: "",
        value: "",
      },
      contacts: [],
    };
  },
  methods: {
    async createContact() {
      const { ...contact} = this.form;
      contact.id = Math.random()*1000;
      contact.marked = false
      const t = await request('/api/contacts','POST',contact)
      this.contacts.push(t)

      this.form.name = this.form.value = "";
    },
    markContact(id) {
      const contact = this.contacts.find((i) => i.id === id);
      contact.marked = true;
    },
    removeContact(id) {},
  },
  async mounted() {
    this.loading = true;
    this.contacts = await request("/api/contacts");
    this.loading = false;
  },
});

async function request(url, method = "GET", data = null) {
  const headers = {};
  let body;                                 

  if (data) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(data);
  }
  try {
    const res = await fetch(url, {
      method,
      headers,
      body,
    });
    return await res.json();
  } catch (e) {
    console.log(e);
  }
}
