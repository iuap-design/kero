#!/bin/sh

# 删除Kind所在行，替换中英文 

sourceStr=(Param Returns Type Description)

replaceStr=(参数 返回值 类型 描述)
#数组长度
strLength=${#sourceStr[@]}

for file in ./docs/API/*
do
	# 判断是否为md结尾的文件
	if test -f $file &&  [ "${file##*.}"x = "md"x ]
    then
        echo $file 是文件
        sed -i "/Kind/"d $file
        

		i=0  
		while [ $i -lt ${#sourceStr[@]} ]  
		do  
			# 双引号是转义，单引号不转义
		    sed -i "s/${sourceStr[$i]}/${replaceStr[$i]}/g" $file
		    let i++  
		done

    fi

done

