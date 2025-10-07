import Alpine from "alpinejs";

document.addEventListener("alpine:init", () => {
  Alpine.data("counterData", () => ({
    counter: "",

    async fetchCounters() {
      try {
        const res = await fetch("/members/remote/?request=update_counters");
        if (!res.ok)
          throw new Error("Failed to fetch counter");

        const data = await res.json();
        this.counter = data.counter;
      }
      catch (err) {
        console.error("Counter fetch error:", err);
        this.counter = 0; // fallback
      }
    },
  }));
});

Alpine.start();
