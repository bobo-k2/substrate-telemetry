// Source code for the Substrate Telemetry Server.
// Copyright (C) 2023 Parity Technologies (UK) Ltd.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.

import * as React from 'react';
import { Maybe } from '../../../common';
import { ColumnProps } from '.';
import { Node } from '../../../state';
import { Tooltip, PolkadotIcon, TooltipCopyCallback } from '../..';
import icon from '../../../icons/tools.svg';

export class CpuArchitectureColumn extends React.Component<ColumnProps> {
  public static readonly label = 'CPU Architecture';
  public static readonly icon = icon;
  public static readonly width = 16;
  public static readonly setting = 'target_arch';
  public static readonly sortBy = ({ target_arch }: Node) => target_arch || '';

  private data: Maybe<string>;
  private copy: Maybe<TooltipCopyCallback>;

  public shouldComponentUpdate(nextProps: ColumnProps) {
    return this.data !== nextProps.node.target_arch;
  }

  render() {
    const { target_arch } = this.props.node;

    this.data = target_arch;

    if (!target_arch) {
      return <td className="Column">-</td>;
    }

    return (
      <td className="Column" onClick={this.onClick}>
        <Tooltip text={target_arch} copy={this.onCopy} />
        <PolkadotIcon
          className="Column-validator"
          account={target_arch}
          size={16}
        />
      </td>
    );
  }

  private onCopy = (copy: TooltipCopyCallback) => {
    this.copy = copy;
  };

  private onClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    if (this.copy != null) {
      this.copy();
    }
  };
}
