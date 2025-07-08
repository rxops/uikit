import { component$, type QRL } from "@builder.io/qwik";
import type { ComponentSize, HealthcareIntent } from "../../design-system";
import { mergeClasses } from "../../design-system/utils";
import {
  ActivityIcon,
  AlertTriangleIcon,
  BellIcon,
  CalendarIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  DownloadIcon,
  EditIcon,
  EyeIcon,
  FileTextIcon,
  FilterIcon,
  HeartIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  TabletIcon as PillIcon,
  PlusIcon,
  RefreshCwIcon,
  RulerIcon,
  SearchIcon,
  SettingsIcon,
  Share2Icon,
  StethoscopeIcon,
  ThermometerIcon,
  ZapIcon as BrainIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  UserIcon,
  ScaleIcon as WeightIcon,
  XCircleIcon,
  SmartphoneIcon,
  MonitorIcon,
  LockIcon,
  ClipboardIcon,
  PenToolIcon,
  ZoomInIcon,
  VideoIcon,
  VideoOffIcon,
  MicIcon,
  MicOffIcon,
  HandIcon,
  RotateCwIcon,
  TrashIcon,
  ScreenShareIcon,
  StopCircleIcon,
  CircleIcon as RecordIcon,
  SkipBackIcon,
  SkipForwardIcon,
  HomeIcon,
  MenuIcon,
  XIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  LogOutIcon,
  LogInIcon,
  UploadIcon,
  CameraIcon,
  InfoIcon,
  StarIcon,
  FolderIcon,
  CopyIcon,
  LinkIcon,
  MessageSquareIcon,
  MessageCircleIcon,
  CrownIcon,
  HelpCircleIcon,
  ShieldIcon,
  DatabaseIcon,
  WifiIcon,
  BatteryIcon,
  PrinterIcon,
  SendIcon,
  BookIcon,
  AwardIcon,
  GlobeIcon,
  SyringeIcon,
  HeadphonesIcon,
  AccessibilityIcon as WheelchairIcon,
  ShoppingCartIcon,
  BuildingIcon as HospitalIcon,
  TruckIcon as AmbulanceIcon,
  DropletIcon,
  BedIcon,
  FlaskConicalIcon as FlaskIcon,
  BriefcaseIcon as BriefcaseMedicalIcon,
  QrCodeIcon,
  CreditCardIcon,
  CheckIcon,
  PauseIcon,
  PlayIcon,
  InfoIcon as InfoCircleIcon,
  LayersIcon,
  BoxIcon as CubeIcon,
  CircleDotIcon as AtomIcon,
  UsersIcon,
  LayoutDashboardIcon,
  SaveIcon,
  PrinterIcon as PrintIcon,
  ShareIcon,
  AlertCircleIcon,
} from 'lucide-qwik';

/**
 * All available icon names
 */
export type IconName =
  | 'activity'
  | 'alert-triangle'
  | 'alert-circle'
  | 'bell'
  | 'calendar'
  | 'check-circle'
  | 'chevron-down'
  | 'chevron-up'
  | 'clock'
  | 'download'
  | 'edit'
  | 'eye'
  | 'file-text'
  | 'filter'
  | 'heart'
  | 'mail'
  | 'map-pin'
  | 'phone'
  | 'pill'
  | 'plus'
  | 'refresh-cw'
  | 'ruler'
  | 'search'
  | 'settings'
  | 'share2'
  | 'share'
  | 'stethoscope'
  | 'thermometer'
  | 'brain'
  | 'trending-up'
  | 'trending-down'
  | 'user'
  | 'weight'
  | 'x-circle'
  | 'smartphone'
  | 'monitor'
  | 'lock'
  | 'clipboard'
  | 'pen-tool'
  | 'zoom-in'
  | 'video'
  | 'video-off'
  | 'mic'
  | 'mic-off'
  | 'hand'
  | 'rotate-cw'
  | 'trash'
  | 'screen-share'
  | 'stop-circle'
  | 'record'
  | 'skip-back'
  | 'skip-forward'
  | 'home'
  | 'menu'
  | 'x'
  | 'arrow-right'
  | 'arrow-left'
  | 'log-out'
  | 'log-in'
  | 'upload'
  | 'camera'
  | 'info'
  | 'star'
  | 'folder'
  | 'copy'
  | 'link'
  | 'message-square'
  | 'message-circle'
  | 'crown'
  | 'help-circle'
  | 'shield'
  | 'database'
  | 'wifi'
  | 'battery'
  | 'printer'
  | 'print'
  | 'send'
  | 'book'
  | 'award'
  | 'globe'
  | 'syringe'
  | 'headphones'
  | 'wheelchair'
  | 'shopping-cart'
  | 'hospital'
  | 'ambulance'
  | 'droplet'
  | 'bed'
  | 'flask'
  | 'briefcase-medical'
  | 'qr-code'
  | 'credit-card'
  | 'check'
  | 'pause'
  | 'play'
  | 'info-circle'
  | 'layers'
  | 'cube'
  | 'atom'
  | 'users'
  | 'layout-dashboard'
  | 'save';

/**
 * Icon Component Props
 */
export interface IconProps {
  /** The name of the icon to render */
  name: IconName;
  /** Size of the icon - uses design system sizes */
  size?: ComponentSize;
  /** Intent color for the icon */
  intent?: HealthcareIntent;
  /** Custom CSS classes */
  class?: string;
  /** Whether the icon is interactive (clickable/focusable) */
  interactive?: boolean;
  /** Click handler for interactive icons */
  onClick$?: QRL<() => void>;
  /** Medical device mode with enhanced accessibility */
  medicalDeviceMode?: boolean;
  /** Emergency mode for critical medical icons */
  emergency?: boolean;
  /** Accessible label for screen readers */
  ariaLabel?: string;
  /** Icon purpose for healthcare contexts */
  purpose?: 'action' | 'status' | 'navigation' | 'emergency' | 'info' | 'decorative';
}

// Map icon names to their corresponding components
const iconMap: Record<IconName, typeof ActivityIcon> = {
  'activity': ActivityIcon,
  'alert-triangle': AlertTriangleIcon,
  'alert-circle': AlertCircleIcon,
  'bell': BellIcon,
  'calendar': CalendarIcon,
  'check-circle': CheckCircleIcon,
  'chevron-down': ChevronDownIcon,
  'chevron-up': ChevronUpIcon,
  'clock': ClockIcon,
  'download': DownloadIcon,
  'edit': EditIcon,
  'eye': EyeIcon,
  'file-text': FileTextIcon,
  'filter': FilterIcon,
  'heart': HeartIcon,
  'mail': MailIcon,
  'map-pin': MapPinIcon,
  'phone': PhoneIcon,
  'pill': PillIcon,
  'plus': PlusIcon,
  'refresh-cw': RefreshCwIcon,
  'ruler': RulerIcon,
  'search': SearchIcon,
  'settings': SettingsIcon,
  'share2': Share2Icon,
  'share': ShareIcon,
  'stethoscope': StethoscopeIcon,
  'thermometer': ThermometerIcon,
  'brain': BrainIcon,
  'trending-up': TrendingUpIcon,
  'trending-down': TrendingDownIcon,
  'user': UserIcon,
  'weight': WeightIcon,
  'x-circle': XCircleIcon,
  'smartphone': SmartphoneIcon,
  'monitor': MonitorIcon,
  'lock': LockIcon,
  'clipboard': ClipboardIcon,
  'pen-tool': PenToolIcon,
  'zoom-in': ZoomInIcon,
  'video': VideoIcon,
  'video-off': VideoOffIcon,
  'mic': MicIcon,
  'mic-off': MicOffIcon,
  'hand': HandIcon,
  'rotate-cw': RotateCwIcon,
  'trash': TrashIcon,
  'screen-share': ScreenShareIcon,
  'stop-circle': StopCircleIcon,
  'record': RecordIcon,
  'skip-back': SkipBackIcon,
  'skip-forward': SkipForwardIcon,
  'home': HomeIcon,
  'menu': MenuIcon,
  'x': XIcon,
  'arrow-right': ArrowRightIcon,
  'arrow-left': ArrowLeftIcon,
  'log-out': LogOutIcon,
  'log-in': LogInIcon,
  'upload': UploadIcon,
  'camera': CameraIcon,
  'info': InfoIcon,
  'star': StarIcon,
  'folder': FolderIcon,
  'copy': CopyIcon,
  'link': LinkIcon,
  'message-square': MessageSquareIcon,
  'message-circle': MessageCircleIcon,
  'crown': CrownIcon,
  'help-circle': HelpCircleIcon,
  'shield': ShieldIcon,
  'database': DatabaseIcon,
  'wifi': WifiIcon,
  'battery': BatteryIcon,
  'printer': PrinterIcon,
  'print': PrintIcon,
  'send': SendIcon,
  'book': BookIcon,
  'award': AwardIcon,
  'globe': GlobeIcon,
  'syringe': SyringeIcon,
  'headphones': HeadphonesIcon,
  'wheelchair': WheelchairIcon,
  'shopping-cart': ShoppingCartIcon,
  'hospital': HospitalIcon,
  'ambulance': AmbulanceIcon,
  'droplet': DropletIcon,
  'bed': BedIcon,
  'flask': FlaskIcon,
  'briefcase-medical': BriefcaseMedicalIcon,
  'qr-code': QrCodeIcon,
  'credit-card': CreditCardIcon,
  'check': CheckIcon,
  'pause': PauseIcon,
  'play': PlayIcon,
  'info-circle': InfoCircleIcon,
  'layers': LayersIcon,
  'cube': CubeIcon,
  'atom': AtomIcon,
  'users': UsersIcon,
  'layout-dashboard': LayoutDashboardIcon,
  'save': SaveIcon,
};

/**
 * Generate size-based CSS classes
 */
function getSizeClasses(size: ComponentSize): string {
  const sizeClassMap: Record<ComponentSize, string> = {
    xs: "w-3 h-3",
    sm: "w-4 h-4", 
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8"
  };

  return sizeClassMap[size];
}

/**
 * Generate intent-based CSS classes using CSS custom properties
 */
function getIntentClasses(intent: HealthcareIntent): string {
  const intentClassMap: Record<HealthcareIntent, string> = {
    primary: "text-primary",
    secondary: "text-secondary", 
    success: "text-success",
    caution: "text-caution",
    danger: "text-danger",
    info: "text-info"
  };

  return intentClassMap[intent];
}

/**
 * Icon Component
 * 
 * Universal Icon component with Medical Device Keyboard Accessibility.
 * Integrates with RxOps Design System tokens and provides healthcare-specific features.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Icon name="heart" />
 * 
 * // With design system sizing and intent
 * <Icon name="alert-triangle" size="lg" intent="danger" />
 * 
 * // Interactive with medical device support
 * <Icon 
 *   name="emergency" 
 *   interactive 
 *   medicalDeviceMode 
 *   emergency 
 *   onClick$={() => handleEmergency()} 
 * />
 * 
 * // Healthcare workflow
 * <Icon name="stethoscope" intent="info" purpose="status" />
 * ```
 */
export const Icon = component$<IconProps>((props) => {
  const { 
    name, 
    size = "md",
    intent,
    class: customClass,
    interactive = false,
    onClick$,
    medicalDeviceMode = false,
    emergency = false,
    ariaLabel,
    purpose = 'decorative',
    ...rest
  } = props;
  
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    // Fallback for unknown icons
    console.warn(`Icon "${name}" not found. Available icons:`, Object.keys(iconMap));
    return (
      <svg 
        class={mergeClasses(
          getSizeClasses(size),
          intent && getIntentClasses(intent),
          customClass
        )}
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
        {...rest}
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    );
  }
  
  // Build complete class string using design system
  const iconClasses = mergeClasses(
    // Base sizing from design system
    getSizeClasses(size),
    // Intent colors from design system
    intent && getIntentClasses(intent),
    // Interactive styling
    interactive && [
      "cursor-pointer transition-all duration-200",
      "hover:scale-110 hover:opacity-80",
      "focus:outline-none focus:ring-2 focus:ring-offset-2"
    ],
    // Medical device enhanced focus indicators
    medicalDeviceMode && interactive && [
      "focus:ring-4 focus:ring-primary/20"
    ],
    // Emergency mode styling
    emergency && [
      "animate-pulse",
      "text-danger"
    ],
    customClass
  );

  const iconElement = (
    <IconComponent 
      class={iconClasses}
      {...rest}
    />
  );
  
  // Wrap interactive icons with proper accessibility
  if (interactive) {
    return (
      <button
        type="button"
        class="inline-flex items-center justify-center relative p-1 rounded"
        data-medical-device={medicalDeviceMode}
        data-emergency={emergency}
        data-purpose={purpose}
        onClick$={onClick$}
        aria-label={
          ariaLabel || 
          (emergency ? `Emergency ${name} action` : `${name} action`)
        }
      >
        {iconElement}
        
        {/* Emergency mode indicator */}
        {emergency && (
          <div class="absolute -top-1 -right-1 w-2 h-2 bg-danger rounded-full border border-white"></div>
        )}
      </button>
    );
  }
  
  // Non-interactive icons (decorative)
  return iconElement;
});

export default Icon;
