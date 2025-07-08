/**
 * RxOps Healthcare Component Examples
 * 
 * Demonstrating the enhanced composition utilities with basic healthcare scenarios
 */

import { component$, type JSXChildren } from "@builder.io/qwik";
import { 
  mergeClasses,
  animations
} from "../design-system/composition-utils";

// ==================== BASIC CLINICAL ALERT ====================

/**
 * Simple Clinical Alert Component without wrapper issues
 */
export const BasicClinicalAlert = component$<{
  priority: 'critical' | 'urgent' | 'routine' | 'stable';
  message: string;
  patient?: string;
  emergency?: boolean;
}>((props) => {
  const priorityClasses = {
    critical: "bg-red-50 border-red-500 text-red-900",
    urgent: "bg-orange-50 border-orange-500 text-orange-900", 
    routine: "bg-blue-50 border-blue-500 text-blue-900",
    stable: "bg-green-50 border-green-500 text-green-900",
  };

  const alertClass = mergeClasses(
    "clinical-alert p-4 rounded-lg border-l-4 shadow-sm",
    priorityClasses[props.priority],
    props.emergency && animations.pulse
  );

  return (
    <div class={alertClass} data-emergency={props.emergency}>
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <h3 class="font-medium mb-1">
            {props.priority.toUpperCase()} Alert
          </h3>
          {props.patient && (
            <p class="text-sm font-medium mb-2">
              Patient: {props.patient}
            </p>
          )}
          <p class="text-sm">{props.message}</p>
        </div>
      </div>
      {props.emergency && (
        <span class="sr-only" aria-live="assertive">
          Emergency mode activated. Handle with immediate attention.
        </span>
      )}
    </div>
  );
});

// ==================== SIMPLE LOADING BUTTON ====================

/**
 * Simple Loading Button Component without wrapper issues
 */
export const SimpleLoadingButton = component$<{
  loading?: boolean;
  disabled?: boolean;
  children?: string | JSXChildren;
  onClick$?: () => void;
}>((props) => {
  if (props.loading) {
    return (
      <div class="relative">
        <div class="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
          <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-rx-color-primary"></div>
        </div>
        <button
          class="btn btn-primary px-4 py-2 rounded opacity-50 pointer-events-none"
          disabled={true}
        >
          {props.children}
        </button>
      </div>
    );
  }

  return (
    <button
      class="btn btn-primary px-4 py-2 rounded"
      disabled={props.disabled}
      onClick$={props.onClick$}
    >
      {props.children}
    </button>
  );
});

// ==================== DEMO USAGE EXAMPLES ====================

export const HealthcareComponentsDemo = component$(() => {
  return (
    <div class="healthcare-demo p-6 space-y-6">
      <h1 class="text-2xl font-bold mb-6">RxOps Healthcare Components Demo</h1>
      
      {/* Clinical Alerts Examples */}
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Clinical Alerts</h2>
        
        <BasicClinicalAlert
          priority="critical"
          message="Patient experiencing cardiac arrhythmia. Immediate intervention required."
          patient="John Doe (Room 302)"
          emergency={true}
        />
        
        <BasicClinicalAlert
          priority="urgent"
          message="Medication due in 15 minutes for diabetes management."
          patient="Jane Smith (Room 401)"
        />
        
        <BasicClinicalAlert
          priority="stable"
          message="Routine vitals check completed successfully."
          patient="Mike Johnson (Room 205)"
        />
      </section>
      
      {/* Loading Buttons */}
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Loading Buttons</h2>
        <div class="flex space-x-4">
          <SimpleLoadingButton>
            Normal Button
          </SimpleLoadingButton>
          
          <SimpleLoadingButton loading={true}>
            Loading Button
          </SimpleLoadingButton>
          
          <SimpleLoadingButton disabled={true}>
            Disabled Button
          </SimpleLoadingButton>
        </div>
      </section>
      
      {/* Utility Functions Demo */}
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Utility Functions</h2>
        <div class="space-y-2">
          <div class="p-3 bg-gray-100 rounded">
            <code>mergeClasses('btn', 'btn-primary', 'px-4')</code>
            <br />
            <span class="text-sm text-gray-600">
              Result: {mergeClasses('btn', 'btn-primary', 'px-4')}
            </span>
          </div>
          
          <div class="p-3 bg-gray-100 rounded">
            <code>animations.pulse</code>
            <br />
            <span class="text-sm text-gray-600">
              Result: {animations.pulse}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
});
