ddl  对表和字段的操作（增删改）
dml  对表值的操作（增删改）
dql 对表数据的查询和过滤：
dcl 船建数据库用户，分配用户可以访问的数据库的权限


dql：
5.select
1.from
2.where（> < = >= <= != <> like [between and] and or && is not）
3.group by
4.having
6.order by
7.limit


函数：
字符串处理函数、日期处理函数、数字处理函数
流程控制函数：
ifnull 
(case 字段 when '值1' then '一线城市' else '二线城市' end) as '工作地址'     
具体值的判断需要case后面跟上具体的字段，下面的范围则不需要
（case when math > 85 then '优秀' when math > 75 then  '及格' else '不及格' end） '数学'
（case when english > 85 then '优秀' when english > 75 then  '及格' else '不及格' end） '英语'

数学    英语
优秀    及格
及格    优秀
不及格  优秀

