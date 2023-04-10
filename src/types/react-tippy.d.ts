/* eslint-disable unused-imports/no-unused-imports */
import type {
  Animation,
  Position,
  Size,
  Theme,
  Tooltip,
  TooltipProps,
  Trigger,
  withTooltip,
} from 'react-tippy';

declare module 'react-tippy' {
  export interface TooltipProps {
    children?: React.ReactNode;
  }

  export type Position = Position;
  export type Trigger = Trigger;
  export type Animation = Animation;
  export type Size = Size;
  export type Theme = Theme;

  export class Tooltip extends React.Component<TooltipProps> {}

  export declare function withTooltip<P>(
    Component: React.ComponentType<P>,
    options: TooltipProps
  ): JSX.Element;
}
