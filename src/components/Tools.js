import React from 'react';

export default function Tools({ data }) {
	return (
		<div className="tools">
			{data.map((node) => {
				return (
					<div className="tool" key={node.title}>
						<div>
							<a
								href={node.path || node.source}
								key={node.path || node.source}
								target="_blank"
								rel="noreferrer"
							>
								<div className="icon">{node.icon}</div>
								<h3>{node.title}</h3>
							</a>
							<div className="description">{node.description}</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
