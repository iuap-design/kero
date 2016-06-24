var sourceValue = [
	{
		label : "C++",
		value: "C++"
	},
	{
		label : 'Java',
		value: 'Java'
	},
	{
		label : 'Python',
		value: 'Python'
	},
	{
		label : 'JavaScript',
		value: 'JavaScript'
	},
	{
		label : 'C#',
		value: 'C#'
	},
	{
		label : 'C',
		value: 'C'
	},
	{
		label : 'Jython',
		value: 'Jython'
	},
	{
		label : 'Html',
		value: 'Html'
	},
	{
		label : 'html',
		value: 'html'
	}
];

new u.Autocomplete({
	el:'#test1',
	source: sourceValue,
	multiSelect: true,
	select: function(item, ac){
	}
})
