import { component$ } from "@builder.io/qwik";

export const Logo = component$(() => {
  return (
    <div class="flex justify-center items-center p-8 bg-white rounded-xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <a 
        href="https://qwik.dev/" 
        class="block transition-transform duration-300 hover:scale-105"
      >
        <img
          class="max-w-full h-auto block rounded-lg"
          alt="Qwik Logo"
          width={400}
          height={147}
          src="https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F667ab6c2283d4c4d878fb9083aacc10f"
        />
      </a>
    </div>
  );
});
