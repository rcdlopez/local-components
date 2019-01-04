import React from 'react';
import IReactComponentProps from '../../common/structures/IReactComponentProps';
import classnames from 'classnames';
import styles from './WindowsToolbar.sass';
import WindowsHamburger from '../../svg/windows_hamburger';
import WindowsMinimize from '../../svg/windows_minimize';
import WindowsMaximize from '../../svg/windows_maximize';
import WindowsClose from '../../svg/windows_close';
import WindowsBack from '../../svg/windows_back';

interface IProps extends IReactComponentProps {

	title: string;
	resizable?: boolean;
	onBack?: (...params: any[]) => any;
	onMinimize: (...params: any[]) => any;
	onMaximize?: (...params: any[]) => any;
	onQuit: (...params: any[]) => any;
	onShowMenu?: (...params: any[]) => any;

}

class WindowsToolbar extends React.Component<IProps> {

	render () {
		return (
			<header className={styles.WindowsToolbar}>
				{
					this.props.onBack && (
						<span
							className={styles.Back}
							onClick={this.props.onBack}
						>
							<WindowsBack />
						</span>
					)
				}
				{
					this.props.onShowMenu && (
						<span
							className={styles.Menu}
							onClick={this.props.onShowMenu}
						>
							<WindowsHamburger />
						</span>
					)
				}
				<div className={styles.DragRegion}>
					{this.props.title}
				</div>
				<div className={styles.RightButtons}>
					<span
						className={styles.Minimize}
						onClick={this.props.onMinimize}
					>
						<WindowsMinimize />
					</span>
					<span
						className={classnames(
							[styles.Maximize],
							{
								'__Disabled': !this.props.resizable,
							},
						)}
						onClick={this.props.onMaximize}
					>
						<WindowsMaximize />
					</span>
					<span
						className={styles.Quit}
						onClick={this.props.onQuit}
					>
						<WindowsClose />
					</span>
				</div>
			</header>
		);
	}

}

export default WindowsToolbar;
